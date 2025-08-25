// 환경 변수 설정
console.log('🔍 === .env 파일 키 값 확인 ===');
console.log('🔍 import.meta.env:', import.meta.env);
console.log('🔍 import.meta.env.VITE_NAVER_CLIENT_ID:', import.meta.env.VITE_NAVER_CLIENT_ID);
console.log('🔍 import.meta.env.VITE_NAVER_CLIENT_ID 타입:', typeof import.meta.env.VITE_NAVER_CLIENT_ID);
console.log('🔍 import.meta.env.VITE_NAVER_CLIENT_ID 길이:', import.meta.env.VITE_NAVER_CLIENT_ID?.length);
console.log('🔍 import.meta.env.VITE_NAVER_CLIENT_ID === undefined:', import.meta.env.VITE_NAVER_CLIENT_ID === undefined);
console.log('🔍 import.meta.env.VITE_NAVER_CLIENT_ID === null:', import.meta.env.VITE_NAVER_CLIENT_ID === null);
console.log('🔍 import.meta.env.VITE_NAVER_CLIENT_ID === ""', import.meta.env.VITE_NAVER_CLIENT_ID === "");
console.log('🔍 import.meta.env.VITE_NAVER_CLIENT_SECRET:', import.meta.env.VITE_NAVER_CLIENT_SECRET);
console.log('🔍 모든 VITE_ 환경변수:');
Object.keys(import.meta.env).forEach(key => {
  if (key.startsWith('VITE_')) {
    console.log(`🔍 ${key}:`, import.meta.env[key]);
  }
});

// 다른 방식으로 환경 변수 접근 시도
console.log('🔍 === 다른 방식으로 환경 변수 접근 ===');
console.log('🔍 process.env.VITE_NAVER_CLIENT_ID:', (globalThis as any).process?.env?.VITE_NAVER_CLIENT_ID);
console.log('🔍 window.__VITE_NAVER_CLIENT_ID__:', (window as any).VITE_NAVER_CLIENT_ID);
console.log('🔍 ======================================');

export const config = {
  NAVER_CLIENT_ID: import.meta.env.VITE_NAVER_CLIENT_ID || 'g9fajjfgo5',
};

// 환경 변수 디버깅
console.log('=== 환경 변수 설정 ===');
console.log('NAVER_CLIENT_ID:', config.NAVER_CLIENT_ID);
console.log('import.meta.env.VITE_NAVER_CLIENT_ID:', import.meta.env.VITE_NAVER_CLIENT_ID);
console.log('import.meta.env:', import.meta.env);
console.log('========================');
