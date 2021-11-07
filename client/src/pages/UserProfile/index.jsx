/* eslint-disable react-hooks/exhaustive-deps */
import axios from 'axios';
import { useEffect, useState } from 'react';
import {useParams} from 'react-router-dom';
import styled from 'styled-components';
import Card, { Portal } from '../../components/Cards';
import { Col, Container, Page, Section } from '../../components/Containers';
import Image from '../../components/ImageDisplays';
import { useQuery } from '../../util';
import DisplaySelector from './DisplaySelector';

const CardsContainer = styled(Container)`
	flex-wrap: wrap;
	flex-direction: row;
	justify-content: center;
`

const UserProfile = () => {
	const [userInfo, setUserInfo] = useState({});
	const [display, setDisplay] = useState('planner');
	const [userRecipes, setUserRecipes] = useState([]);
	const [planner, setPlanner] = useState([]);
	const params = useParams()
	const query = useQuery()
	const displayQuery = query.get('display')

	async function fetchUserInfo() {
		const res = await axios.get(`/api/user/${params.userId}`);
		// console.log(res.data);
		setUserInfo(res.data)
	}
	async function fetchUserRecipes() {
		const res = await axios.get(`/api/recipes/user/${params.userId}`);
		// console.log(res.data);
		setUserRecipes(res.data)
	}
	async function fetchPlannerInfo() {
		const res = await axios.get(`/api/mealPlan/userPlans/${params.userId}`);
		// console.log(res.data);
		setPlanner(res.data)
	}

	// Fetch info on page load
	useEffect(() => {
		fetchUserInfo();
		fetchUserRecipes();
		fetchPlannerInfo();
	}, [params.userId])
	
	// On display switch reload display info
	useEffect(() => {
		if (display === 'planner') {
			fetchPlannerInfo();
		}
		if (display === "recipes") {
			fetchUserRecipes();
		}
	}, [display])
	
	// Set display based on query
	useEffect(() => {
		const acceptedDisplays = ['planner', 'recipes']
		if (acceptedDisplays.indexOf(displayQuery) !== -1) {
			setDisplay(displayQuery)
		}
	}, [displayQuery])

	return (
		<Page>
			<Section>
				<Col hCenter>
					<Image.Profile src={userInfo?.profileImage?.url} size={'300px'}/>
					<h1>{userInfo?.name}</h1>
				</Col>
			</Section>

			<DisplaySelector
				currentTab={display}
				onTabClick={(tab) => setDisplay(tab)}
			/>

			<Section>
				{display === 'planner' && (
					<CardsContainer>
						{planner.map((mealPlan) => (
							<Card.MealPlan 
								key={mealPlan._id}
								name={mealPlan?.recipe?.name} 
								id={mealPlan?._id}
								image={mealPlan?.recipe?.picture?.url}
								style={{margin: '18px 9px', marginTop: 0}}
								currentStep={mealPlan?.currentStep}
								time={mealPlan?.recipe?.time}
								shoppingList={mealPlan?.shoppingList}
								onMealDelete={(deletedMeal) => setPlanner(planner.filter((plan) => plan._id !== deletedMeal._id))}
							/>
						))}

						<Portal.FindMeals style={{margin: '18px 9px', marginTop: 0}} />
					</CardsContainer>
				)}
				{display === 'recipes' && (
					<CardsContainer>
						<Portal.CreateRecipe style={{margin: '18px 9px', marginTop: 0}} />
						{userRecipes.map((recipe) => {
							return(
								<Card.UserRecipe
									key={recipe?._id}
									name={recipe?.name} 
									id={recipe?._id}
									image={recipe?.picture?.url}
									style={{margin: '18px 9px', marginTop: 0}}
									onRecipeDelete={(deletedRecipe) => setUserRecipes(userRecipes.filter((recipe) => recipe._id !== deletedRecipe._id))}
								/>
							)
						})}
				</CardsContainer>
				)}
			</Section>
		</Page>	
	)
}

export default UserProfile
