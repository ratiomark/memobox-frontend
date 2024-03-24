import { ReactNode } from 'react';
import cls from './HotKeyPresenter.module.scss'

interface HotKeyPresenterProps {
	keysCombination: string[]
	description?: ReactNode;
}

export const HotKeyPresenter = (props: HotKeyPresenterProps) => {
	const { keysCombination, description } = props;

	const renderKeyCombination = () => {
		if (keysCombination.length === 1) {
			return <span className={cls.key}>{keysCombination[0]}</span>;
		} else {
			return keysCombination.map((key, index) => (
				<span key={index}>
					<span className={(
						isNaN(Number(key))
							? cls.key
							: cls.key_number)}
					>
						{key}
					</span>
					{index < keysCombination.length - 1 && <span className={cls.separator}>+</span>}
				</span>
			));
		}
	};

	return (
		<div className={cls.container}>
			<div className={cls.keyCombination}>{renderKeyCombination()}</div>
			{description && <div className={cls.description}>{description}</div>}
		</div>
	);
};

