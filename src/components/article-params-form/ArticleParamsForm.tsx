import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { Text } from '../text';
import { RadioGroup } from '../radio-group';

import styles from './ArticleParamsForm.module.scss';

import { clsx } from 'clsx';
import { useState } from 'react';
import { Select } from '../select';
import {
	OptionType,
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';
import { Separator } from '../separator';

type TArticleParamsFormProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (arg: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	currentArticleState,
	setCurrentArticleState,
}: TArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [selectState, setSelectState] = useState(currentArticleState);

	const changeState = (key: keyof ArticleStateType) => (option: OptionType) =>
		setSelectState((prev) => ({ ...prev, [key]: option }));

	return (
		<>
			{isOpen && (
				<div className={styles.overlay} onClick={() => setIsOpen(false)}></div>
			)}
			<ArrowButton onClick={() => setIsOpen((p) => !p)} isOpen={isOpen} />
			<aside
				className={clsx(styles.container, isOpen && styles.container_open)}>
				<form
					className={styles.form}
					onSubmit={(e) => {
						e.preventDefault();
						setCurrentArticleState(selectState);
						setIsOpen(false);
					}}
					onReset={() => {
						setCurrentArticleState(defaultArticleState);
						setSelectState(defaultArticleState);
					}}>
					<Text as='h2' size={31} weight={800}>
						ЗАДАЙТЕ ПАРАМЕТРЫ
					</Text>
					<Select
						onChange={changeState('fontFamilyOption')}
						options={fontFamilyOptions}
						selected={selectState.fontFamilyOption}
						title='шрифт'
					/>
					<RadioGroup
						onChange={changeState('fontSizeOption')}
						name='размер шрифта'
						options={fontSizeOptions}
						selected={selectState.fontSizeOption}
						title='размер шрифта'
					/>
					<Select
						onChange={changeState('fontColor')}
						options={fontColors}
						selected={selectState.fontColor}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						onChange={changeState('backgroundColor')}
						options={backgroundColors}
						selected={selectState.backgroundColor}
						title='цвет фона'
					/>
					<Select
						onChange={changeState('contentWidth')}
						options={contentWidthArr}
						selected={selectState.contentWidth}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
