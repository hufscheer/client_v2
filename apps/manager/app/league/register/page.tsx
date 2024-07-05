'use client';

import { CalendarIcon } from '@hcc/icons';
import {
  Button,
  Calendar,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Icon,
  Input,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  toast,
} from '@hcc/ui';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import Layout from '@/components/Layout';

import * as styles from './styles.css';

const formSchema = z.object({
  leagueName: z.string().min(1, { message: '대회명을 입력해주세요' }),
  startDate: z.date({ message: '시작일을 입력해주세요' }),
  endDate: z.date().nullable(),
  round: z.string({ message: '라운드를 입력해주세요' }),
});

const defaultValues = {
  leagueName: '',
  endDate: null,
  round: '32',
};

type FormSchema = z.infer<typeof formSchema>;

export default function Page() {
  const methods = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data: FormSchema) => {
    toast({
      title: '테스트용 대회 생성 메시지',
      description: JSON.stringify(data),
    });
  };

  return (
    <Layout navigationTitle="신규 대회 만들기">
      <Form {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)} style={{ flex: 1 }}>
          <FormField
            control={methods.control}
            name="leagueName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>대회 이름</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="startDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>시작일</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button colorScheme="outline" fullWidth justify="between">
                        <span>
                          {field.value
                            ? new Date(field.value).toLocaleDateString()
                            : ''}
                        </span>
                        <Icon source={CalendarIcon} />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      defaultValue={field.value}
                      onChange={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="endDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>종료일</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button colorScheme="outline" fullWidth justify="between">
                        <span>
                          {field.value
                            ? new Date(field.value).toLocaleDateString()
                            : ''}
                        </span>
                        <Icon source={CalendarIcon} />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      defaultValue={field.value}
                      onChange={field.onChange}
                    />
                  </PopoverContent>
                </Popover>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={methods.control}
            name="round"
            render={({ field }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormLabel>진행 방식</FormLabel>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                  </FormControl>

                  <SelectContent>
                    <SelectItem value="32">32강</SelectItem>
                    <SelectItem value="16">16강</SelectItem>
                    <SelectItem value="8">8강</SelectItem>
                    <SelectItem value="4">4강</SelectItem>
                    <SelectItem value="2">결승</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button fullWidth className={styles.button}>
            대회 만들기
          </Button>
        </form>
      </Form>

      <div className={styles.tipBox}>
        <div className={styles.tipTitle}>
          <span className={styles.emoji}>🙌🏻</span>
          <span>새로운 대회에 팀을 추가하는 방법</span>
        </div>
        <p className={styles.tipDescription}>
          신규 대회를 만든 뒤 참가 팀 관리 탭에서 팀 생성과 <br /> 편집을 할 수
          있어요.
        </p>
      </div>
    </Layout>
  );
}
