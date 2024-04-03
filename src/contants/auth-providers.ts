export const AUTH_PROVIDERS_ENUM = {
    GOOGLE: "GOOGLE",
    KAKAO: "KAKAO",
    NAVER: "NAVER",
    GITHUB: "GITHUB"
} as const;

export type AUTH_PROVIDERS = keyof typeof AUTH_PROVIDERS_ENUM;
