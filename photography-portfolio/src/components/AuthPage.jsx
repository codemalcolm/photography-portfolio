import { Box, Button, Input, InputGroup, InputRightElement } from '@chakra-ui/react'
import React, { useState } from 'react'
import useLogin from '../hooks/Auth/useLogin';

const AuthPage = () => {
    const [inputs, setInputs] = useState({
		email: "",
		password: "",
	});
	const { loading, error, login } = useLogin();
	const [showPassword, setShowPassword] = useState(false);
  return (
		<Box color={"white"} mt={"84px"} w={"360px"} mx={"auto"}>
            <Input
                placeholder="Email"
                fontSize={14}
                type="email"
                value={inputs.email}
                size={"sm"}
                rounded={4}
                onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            />
            <Input
                placeholder="Password"
                fontSize={14}
                type={!showPassword ? "password" : "text"}
                value={inputs.password}
                size={"sm"}
                rounded={4}
                onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
            />
            <Button
				w={"full"}
				colorScheme="blue"
				size={"sm"}
				fontSize={14}
				isLoading={loading}
				onClick={() => login(inputs)}
			>
				Login
			</Button>
        </Box>
        
  )
}

export default AuthPage
