import {
	Text,
	VStack,
	Flex
} from "@chakra-ui/react";
import CollectionsSection from "./CollectionsSection";
import CategorySection from "./CategorySection";

const Dashboard = () => {
	return (
		<Flex p={4} mx="auto" mt={"64px"} backgroundColor="white" width={"1000px"}>
			<VStack width={"100%"} alignItems={"center"} justifyContent={"center"} >
				<Text fontSize="32px" mb={4}>
					DASHBOARD
				</Text>
				<CollectionsSection/>
				<CategorySection/>
			</VStack>

			
		</Flex>
	);
};

export default Dashboard;
