"""문학늬우스 쇼츠 배경음악(직접 합성): 밝고 잔잔한 피아노 아르페지오 + 패드 + 부드러운 베이스, 84BPM F장조.
python3 make_bgm.py out.wav [초=75]"""
import sys, numpy as np, soundfile as sf
SR=44100; BPM=84; B=60/BPM; dur=float(sys.argv[2]) if len(sys.argv)>2 else 75
N=int(SR*(dur+4)); L=np.zeros(N); R=np.zeros(N)
def hz(m): return 440*2**((m-69)/12)
rng=np.random.default_rng(7)
def piano(m,t0,len_,vel,pan=0.0):
    n=int(SR*min(len_,3.5)); t=np.arange(n)/SR; f=hz(m)
    env=np.exp(-t*(2.2+f/900))*(1-np.exp(-t*180))
    w=(np.sin(2*np.pi*f*t)+0.35*np.sin(2*np.pi*2*f*t)*np.exp(-t*3)+0.12*np.sin(2*np.pi*3*f*t)*np.exp(-t*5))*env*vel
    i=int(t0*SR); e=min(N,i+n); w=w[:e-i]; L[i:e]+=w*(1-pan)*0.8; R[i:e]+=w*(1+pan)*0.8
def pad(ms,t0,len_,vel):
    n=int(SR*len_); t=np.arange(n)/SR; env=np.minimum(1,t/1.2)*np.minimum(1,(len_-t)/1.2)
    w=sum(np.sin(2*np.pi*hz(m)*t*(1+d))+0.0 for m in ms for d in (-0.0015,0.0015))*env*vel
    i=int(t0*SR); e=min(N,i+n); L[i:e]+=w[:e-i]*0.9; R[i:e]+=w[:e-i]*0.9
def bass(m,t0,len_,vel):
    n=int(SR*len_); t=np.arange(n)/SR; env=np.exp(-t*1.4)*(1-np.exp(-t*60))
    w=np.sin(2*np.pi*hz(m)*t)*env*vel; i=int(t0*SR); e=min(N,i+n); L[i:e]+=w[:e-i]; R[i:e]+=w[:e-i]
# F - C/E - Dm - Bb  |  F - Am - Bb - C  (각 1마디)
prog=[([65,69,72,77],53),([64,67,72,76],52),([62,65,69,74],50),([58,65,70,74],46),
      ([65,69,72,77],53),([64,69,72,76],57),([58,65,70,74],46),([60,64,67,72],48)]
bar=4*B; t=0.0; k=0
patt=[0,1,2,3,2,1,2,3]
while t<dur:
    ch,bs=prog[k%8]; sec=(k//8)%3
    pad([m-12 for m in ch[:3]],t,bar+0.3,0.018)
    bass(bs-12,t,2*B,0.11); bass(bs-12,t+2*B,2*B,0.07)
    for j,ix in enumerate(patt):
        if sec==0 and j%2==1: continue                     # 첫 구간은 더 성기게
        v=0.07 if j%2==0 else 0.05
        piano(ch[ix]+(12 if (sec==2 and j==6) else 0),t+j*B/2+rng.normal(0,0.006),B*1.5,v*(1+rng.normal(0,0.08)),pan=0.25*np.sin(j))
    if sec>=1 and k%2==1: piano(ch[3]+12,t+3.5*B,B,0.035,pan=-0.3)   # 가끔 높은 음 한 방울
    t+=bar; k+=1
# 리버브(짧은 잔향): 지수 감쇠 잡음 IR 컨볼루션
ir_n=int(SR*1.6); ir=rng.normal(0,1,ir_n)*np.exp(-np.arange(ir_n)/SR*3.2); ir/=np.sqrt((ir**2).sum())
from scipy.signal import fftconvolve
L=L+0.35*fftconvolve(L,ir)[:N]; R=R+0.35*fftconvolve(R,ir[::-1].copy())[:N]
x=np.stack([L,R],1)[:int(SR*dur)]
fade=int(SR*2.5); x[-fade:]*=np.linspace(1,0,fade)[:,None]; x[:int(SR*0.6)]*=np.linspace(0,1,int(SR*0.6))[:,None]
x/=np.abs(x).max()/0.8
sf.write(sys.argv[1],x.astype(np.float32),SR)
print('ok',sys.argv[1],dur)
