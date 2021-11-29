/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useEffect, useState, useReducer } from "react";
import axios from "axios";
import { useHistory, useParams } from 'react-router';

import Button, { BackButton } from "../../components/Buttons";
import { Col, Container, GridRow, Page, Row, Section } from '../../components/Containers/index';
import ErrorPrompt from "../../components/ErrorPrompt";
import Input, { TextArea, ImageInput, TagsInput } from "../../components/Inputs";
import LoginRequiredModal from "../../components/Modals/LoginRequired";
import { DeleteButton, StepDeleteButton } from "./components";
import {Step, Ingredient} from './classes';

const initialState = {
	form: {
		name: '',
		description: '',
		tags: [],
		time: {hour: '', minutes: ''},
		avatar: null,
		ingredients: [new Ingredient()],
		steps: [new Step()]
	},
	loggedUser: null,
	errors: { name: '', description: '', time: '', ingredients: [], steps: [] },
	modal: '',
};

const reducer = (state, action) => {
	const {form, form: {ingredients, steps, time}, errors} = state;
	switch(action.type) {
		case "SET_FORM": 
			return {...state, form: {...state.form, ...action.payload}};
		case "SET_TIME": 
			return {...state, form: {...state.form, time: {...state.form.time, ...action.payload}}};
		case "SET_INGREDIENTS": 
			return {...state, form: {...state.form, ingredients: action.payload}};
		case "REMOVE_INGREDIENT": {
			const array = [...ingredients];
			array.splice(action.index, 1);

			return {...state, form: {...form, ingredients: array}};
		}
		case "ADD_INGREDIENT_FIELD": 
			return {...state, form: {...form, ingredients: [...ingredients, new Ingredient()]}};
			
		case "SET_STEPS": 
			return {...state, form: {...state.form, steps: action.payload}};
		case "REMOVE_STEP": {
			const array = [...steps];
			array.splice(action.index, 1);

			return {...state, form: {...form, steps: array}};
		}
		case "ADD_STEP_FIELD": 
				return {...state, form: {...form, steps: [...steps, new Step()]}};

		case "SET_ERROR": 
			return {...state, errors: {...state.errors, ...action.payload}};
		case "SET_LOGGEDUSER": 
			return {...state, loggedUser: action.payload};
		case "SET_MODAL": 
			return {...state, modal: action.payload};

		default: return state;
	}
}

const CreateRecipe = (props) => {
	const [state, dispatch] = useReducer(reducer, initialState)
	const {form, form: {ingredients, steps}, errors, loggedUser, modal} = state;
	const history = useHistory()
	const params = useParams()

	// dispatches
	const setForm = (value) => {
		dispatch({type: "SET_FORM", payload: value})
	}
	const setTime = (value) => {
		dispatch({type: "SET_TIME", payload: value})
	}
	const setIngredients = (value) => {
		dispatch({type: "SET_INGREDIENTS", payload: value})
	}
	const setSteps = (userInfo) => {
		dispatch({type: "SET_STEPS", payload: userInfo})
	}
	const setModal = (modalName) => {
		dispatch({type: "SET_MODAL", payload: modalName})
	}
	const setErrors = (value) => {
		dispatch({type: "SET_ERROR", payload: value})
	}
	const setLoggedUser = (userInfo) => {
		dispatch({type: "SET_LOGGEDUSER", payload: userInfo})
	}

	useEffect(() => {
		async function fetchUserInfo() {
			const res = await axios.get('/api/session');
			setLoggedUser(res.data);
		}
		fetchUserInfo();

		if (props.mode === "edit") {
			async function fetchRecipeInfo() {
				const res = await axios.get(`/api/recipes/${params.recipeId}`)

				setForm({name : res.data.name, description: res.data.description, tags: res.data.tags, time: {hour: res.data.time?.hour || '', minutes: res.data.time?.minutes || ''}, avatar: res.data?.picture?.avatar});
				setSteps(res.data.steps)
				setIngredients(res.data.ingredients)
			}
			fetchRecipeInfo()
		}

	}, [])


	

	const handleChange = (e) => {
		const { name } = e.target;
		setForm({ [name]: e.target.value });
	};

	function handleIngredientChange(e, index) {
		const { value, name } = e.currentTarget
		const editedObject = { ...ingredients[index], [name]: value }

		const array = [...ingredients]
		array.splice(index, 1, editedObject)

		for (let i = array.length - 1; i >= 0; i--) {
			if (i !== index && array[i].amount === '' && array[i].unit === '' && array[i].name === '') {
				array.splice(i, 1);
			}
		}

		setIngredients(array)
	}

	function removeIngredient(index) {
		dispatch({type: "REMOVE_INGREDIENT", index});
	}

	function addIngredient() {
		dispatch({type: "ADD_INGREDIENT_FIELD"});
	}

	function handleStepChange(e, index) {
		const { value, name } = e.currentTarget
		const editedObject = { ...steps[index], [name]: value }

		const array = [...steps]
		array.splice(index, 1, editedObject)

		for (let i = array.length - 1; i >= 0; i--) {
			if (i !== index && array[i].title === '' && array[i].body === '') {
				array.splice(i, 1);
			}
		}

		setSteps(array)
	}

	function addStep() {
		dispatch({type: "ADD_STEP_FIELD"});
	}

	function removeStep(index) {
		dispatch({type: "REMOVE_STEP", index});
	}

	function checkForm() {
		if (!loggedUser) {
			return setModal('reqLogin')
		}
		const errors = {name: '', description: '', time: '', ingredients: [], steps: []}

		if (!form.name) {
			errors.name = "Include the name of your recipe"
		}

		if (!form.description) {
			errors.description = "The description of your recipe"
		}

		if (!form.time.hour && !form.time.minutes) {
			errors.time = "Include an estimate cooking time"
		}

		for (let i = 0; i < ingredients.length; i++) {
			if (!ingredients[i].amount || !ingredients[i].name) {
				errors.ingredients.push('Include an amount and ingredient name')
			} else {
				errors.ingredients.push(null)
			}
		}

		for (let i = 0; i < steps.length; i++) {
			if (!steps[i].title || !steps[i].body) {
				errors.steps.push('Include a title and description for your step')
			} else {
				errors.steps.push(null)
			}
		}
		setErrors(errors);

		if (
			!errors.name &&
			!errors.description &&
			!errors.time &&
			errors.ingredients.filter((each) => each !== null).length === 0 &&
			errors.steps.filter((each) => each !== null).length === 0)
		{
			postRecipe()
		}
	}


	const postRecipe = async () => {
		const formData = new FormData();
		if (typeof form.avatar !== 'string') {
			formData.append('avatar', form.avatar)
		}
		formData.append('name', form.name)
		formData.append('description', form.description)
		formData.append('tags', JSON.stringify(form.tags))
		formData.append('time', JSON.stringify(form.time))
		formData.append('steps', JSON.stringify(steps))
		formData.append('ingredients', JSON.stringify(ingredients))

		let res;
		
		// IF EDIT then send edit request
		if (props.mode === 'edit') {
			res = await axios.put(`/api/recipes/${params.recipeId}/edit`, formData);
		} else {
		// ELSE send create request 
			res = await axios.post('/api/recipes/new', formData);
		}

		if (typeof res.data === 'object') {
			history.push(`/profile/${loggedUser._id}?display=recipes`)
		}

	};

	return (
		<>
		<Page>
			<Section>
				<Container>
					<GridRow gap={"36px"}>
						<Col>

							<GridRow style={{ marginBottom: 36 }}>
								<BackButton />
								<h1 style={{ margin: 0 }}> {props.mode !== 'edit' ? " Add a Recipe" : "Edit Recipe"}
								</h1>
							</GridRow>

							{/* Recipe name Input */}
							<Col style={{ marginBottom: 12 }}>
								<Input
									onChange={(e) => handleChange(e)}
									value={form.name}
									type="text"
									name="name"
									placeholder="Meal Name"
									error={errors.name}
									/>
								{errors.name && <ErrorPrompt>{errors.name}</ErrorPrompt>}
							</Col>

							{/* Recipe description input */}
							<Col style={{ marginBottom: 18 }}>
								<TextArea
									onChange={(e) => handleChange(e)}
									value={form.description}
									type="text"
									name="description"
									placeholder="Description"
									style={{ minHeight: '8rem' }}
									error={errors.description}
								/>
								{errors.description && <ErrorPrompt>{errors.description}</ErrorPrompt>}
							</Col>

							{/* Tags input */}
							<TagsInput
								onChange={(data) => setForm({ ...form, tags: data })}
								value={form.tags}
								style={{ marginBottom: 18 }}
							/>

							{/* Est time input */}
							<Col style={{ marginBottom: 18 }}>
								<GridRow style={{ alignItems: 'center', fontSize: '.9rem' }} gap={'6px'}>
									<p style={{ margin: 0 }}>Est. Time to cook</p>
									<Row vCenter>
										<Input
											onChange={(e) => setTime({hour: e.target.value})}
											value={form.time.hour}
											type="number"
											name="hour"
											placeholder="0"
											style={{ width: '4rem' }}
											min={1}
											max={24}
											error={errors.time}
										/>
										<p style={{ margin: 0 }}>hr </p>
									</Row>
									<Row vCenter>
										<Input
											onChange={(e) => setTime({minutes: e.target.value})}
											value={form.time.minutes}
											type="number"
											name="minutes"
											placeholder="00"
											style={{ width: '4rem' }}
											min={1}
											max={59}
											error={errors.time}
										/>
										<p style={{ margin: 0 }}>mins</p>
									</Row>
								</GridRow>
								{errors.time && <ErrorPrompt>{errors.time}</ErrorPrompt>}
							</Col>

							{/* Ingredients input */}
							<h2 style={{ marginBottom: 12 }}>Ingredients</h2>
							<Col style={{ marginBottom: '-6px' }}>
								{ingredients.map((ingredient, index) => (
									<Col key={`ing${index}`} style={{ marginBottom: 6 }}>
										<GridRow key={index} colTemplate={'8rem 4rem 1fr'} gap={'6px'} style={{ position: 'relative' }}>
											{index !== 0 && (<DeleteButton onClick={() => removeIngredient(index)} />)}
											<Input
												type="number"
												name='amount'
												placeholder="amount"
												value={ingredient.amount}
												onChange={(e) => handleIngredientChange(e, index)}
												min={0}
												error={errors?.ingredients[index]}
											/>
											<Input
												type="text"
												name='unit'
												placeholder="unit"
												value={ingredient.unit}
												onChange={(e) => handleIngredientChange(e, index)}
												error={errors?.ingredients[index]}
											/>
											<Input
												type="text"
												name='name'
												placeholder="name"
												value={ingredient.name}
												onChange={(e) => handleIngredientChange(e, index)}
												error={errors?.ingredients[index]}
											/>
										</GridRow>
										{errors?.ingredients[index] && <ErrorPrompt>{errors?.ingredients[index]}</ErrorPrompt>}
									</Col>
								))}
								<Button.Ghost
									onClick={() => addIngredient()}
									color={'#c4c4c4'}
									style={{ borderStyle: 'dashed', marginTop: 12 }}
									rounded
								>
									Add field +
								</Button.Ghost>
							</Col>

							{/* Steps input */}
							<h2 style={{ marginBottom: 12 }}>Steps</h2>
							<Col style={{ marginBottom: '-12px' }}>
								{steps.map((step, index) => (
									<Col key={`stp${index}`} style={{ marginBottom: 12 }}>
										<Row style={{ justifyContent: 'space-between', marginBottom: 6 }}>
											<h3 style={{ margin: 0 }}>Step {index + 1}</h3>
											{index !== 0 && (
												<StepDeleteButton onClick={() => removeStep(index)} />
											)}
										</Row>
										<Input
											type="text"
											name='title'
											placeholder="Step Title"
											value={step.title}
											onChange={(e) => handleStepChange(e, index)}
											style={{ borderRadius: "6px 6px 0 0" }}
											error={errors?.steps[index]}
										/>
										<TextArea
											type="text"
											name='body'
											placeholder="Step Description"
											value={step.body}
											onChange={(e) => handleStepChange(e, index)}
											style={{ borderRadius: "0 0 6px 6px", borderTop: 0, minHeight: '6rem' }}
											error={errors?.steps[index]}
										/>
										{errors?.steps[index] && <ErrorPrompt>{errors?.steps[index]}</ErrorPrompt>}
									</Col>
								))}
							</Col>
							<Button.Ghost
								onClick={() => addStep()}
								color={'#c4c4c4'}
								style={{ borderStyle: 'dashed', marginTop: 12 }}
								rounded
							>
								Add field +
							</Button.Ghost>
						</Col>
						
						{/* Recipe Picture Input */}
						<ImageInput
							onChange={(file) => setForm({...form, avatar: file})}
							value={form.avatar}
							height={'600px'}
							width={'400px'}
							borderRadius={'12px'}
						/>

					</GridRow>
					<Button.Primary
						color={"#FFB800"}
						style={{ width: 300, marginTop: 24, alignSelf: 'center', fontSize: '1rem' }}
						onClick={checkForm}
					>
						{props.mode !== 'edit' ? "Submit" : "Edit"}
					</Button.Primary>
				</Container>
			</Section>
		</Page>
		{modal && (
				<>
					{modal === 'reqLogin' && (
						<LoginRequiredModal 
							closeModal={() => setModal('')}
						/>
					)}
				</>
			)}
		</>
	)
}

export default CreateRecipe
