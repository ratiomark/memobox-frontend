// import cls from './LoginForm.module.scss'
// import { Button } from '@/shared/ui/Button';
// import { useCallback } from 'react';
// import { useAppDispatch } from '@/shared/lib/helpers/hooks/useAppDispatch';
// import { rtkApiGetMe } from '@/entities/User/model/api/userApi';

// interface GetMeButtonProps {
// 	className?: string;
// }

// export const GetMeButton = (props: GetMeButtonProps) => {
// 	const dispatch = useAppDispatch()

// 	const onMeClick = useCallback(async () => {
// 		dispatch(rtkApiGetMe())
// 	}, [dispatch])

// 	return (
// 		<Button
// 			variant='outline'
// 			size='size_m'
// 			className={cls.loginBtn}
// 			onClick={onMeClick}
// 		>
// 			Me
// 		</Button>
// 	)
// }