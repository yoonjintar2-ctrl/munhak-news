"""맥 없이 GitHub Actions(CPU)에서 AI 펜화 삽화를 그린다 — 맥 img_worker.py 와 같은 모델(SDXL base 1.0 + SDXL-Lightning 4단계),
같은 프롬프트·시드·크기. CPU 라 float32. 밑그림(init) 항목은 img2img.
사용: python3 scripts/cloud/img_run.py <zz-img-D.json> <항목 id> <out 폴더>  → out/img-D/<id>_<seed>.png
"""
import os, sys, json, time
import torch
from diffusers import StableDiffusionXLPipeline, UNet2DConditionModel, EulerDiscreteScheduler
from huggingface_hub import hf_hub_download
from safetensors.torch import load_file

ROOT = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
J = json.load(open(sys.argv[1], encoding='utf-8'))
ID = sys.argv[2]
OUT = os.path.join(sys.argv[3], J.get('name', 'img')); os.makedirs(OUT, exist_ok=True)
it = next(i for i in J['items'] if i['id'] == ID)
torch.set_num_threads(os.cpu_count() or 4)
t0 = time.time()
base = 'stabilityai/stable-diffusion-xl-base-1.0'
unet = UNet2DConditionModel.from_config(UNet2DConditionModel.load_config(base, subfolder='unet'))
unet.load_state_dict(load_file(hf_hub_download('ByteDance/SDXL-Lightning', 'sdxl_lightning_4step_unet.safetensors'), device='cpu'))
pipe = StableDiffusionXLPipeline.from_pretrained(base, unet=unet, torch_dtype=torch.float32, variant='fp16')
pipe.scheduler = EulerDiscreteScheduler.from_config(pipe.scheduler.config, timestep_spacing='trailing')
pipe.enable_vae_tiling()
print(f'모델 준비 {time.time()-t0:.0f}초', flush=True)
for sd in it.get('seeds', [1]):
    fp = os.path.join(OUT, f"{it['id']}_{sd}.png")
    if os.path.exists(fp): continue
    t1 = time.time()
    g = torch.Generator('cpu').manual_seed(sd)
    if it.get('init'):
        from diffusers import StableDiffusionXLImg2ImgPipeline
        from PIL import Image
        i2i = StableDiffusionXLImg2ImgPipeline.from_pipe(pipe)
        st = float(it.get('strength', 0.55))
        img = i2i(prompt=it['prompt'], negative_prompt=it.get('neg'), image=Image.open(os.path.join(ROOT, it['init'])).convert('RGB'),
                  strength=st, num_inference_steps=max(4, round(4 / st)), guidance_scale=0, generator=g).images[0]
    else:
        img = pipe(prompt=it['prompt'], negative_prompt=it.get('neg'), num_inference_steps=4, guidance_scale=0,
                   width=it.get('w', 1344), height=it.get('h', 768), generator=g).images[0]
    img.save(fp)
    print(f"{it['id']}_{sd} {time.time()-t1:.0f}초", flush=True)
