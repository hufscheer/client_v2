'use client';

import { Button, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import { useRouter } from 'next/navigation';

import Layout from '@/components/Layout';
import useLoginMutation from '@/hooks/mutations/useLoginMutation';

export default function Login() {
  const router = useRouter();

  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },
    validate: {
      email: value => (value.includes('@') ? null : 'Invalid email'),
      password: value => (value.length >= 4 ? null : 'Password is too short'),
    },
    validateInputOnChange: true,
  });

  const { mutate: mutateLogin } = useLoginMutation();
  const handleSubmit = (values: typeof form.values) => {
    mutateLogin(values, {
      onSuccess: () => {
        router.replace('/');
      },
    });
  };

  return (
    <Layout headerVisible={false} navigationVisible={false}>
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="이메일을 입력해주세요."
          {...form.getInputProps('email')}
        />

        <TextInput
          type="password"
          withAsterisk
          label="Password"
          placeholder="비밀번호을 입력해주세요."
          {...form.getInputProps('password')}
        />

        <Button mt="md" fullWidth type="submit">
          로그인
        </Button>
      </form>
    </Layout>
  );
}
