import { z } from 'zod';

export const teamPlayerSchema = z.object({
  name: z.string().min(1, { message: '플레이어 이름을 입력해주세요' }),
  number: z
    .string()
    .min(1, { message: '플레이어 번호를 입력해주세요' })
    .refine(val => !isNaN(Number(val)), {
      message: '플레이어 번호는 숫자여야 합니다.',
    })
    .refine(val => Number(val) >= 0, {
      message: '플레이어 번호는 0 이상이어야 합니다.',
    }),
});

export const teamFormSchema = z.object({
  logo: z
    .union([z.string(), z.instanceof(File)])
    .refine(
      value =>
        (typeof value === 'string' && value.trim() !== '') ||
        value instanceof File,
      { message: '로고를 추가해주세요' },
    ),
  name: z.string().min(1, { message: '팀명을 입력해주세요' }),
  players: z
    .array(teamPlayerSchema)
    .nonempty({ message: '플레이어를 추가해주세요' }),
});

export type TeamFormSchema = z.infer<typeof teamFormSchema>;

export const teamDefaultValues = {
  logo: '',
  name: '',
  players: [],
};
