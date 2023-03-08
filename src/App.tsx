import {
  ChakraProvider,
  Box,
  Text,
  VStack,
  Grid,
  theme,
  Switch,
  Heading,
  Img,
  Flex,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { STORAGE_KEY } from "./constants";

export const App = () => {
  const [focusMode, setFocusMode] = useState(false);

  useEffect(() => {
    const initializeFocusMode = async () => {
      const result = await chrome.storage.sync.get(STORAGE_KEY);
      setFocusMode(result[STORAGE_KEY]);
    };

    initializeFocusMode();
  }, []);

  const handleModeChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setFocusMode(e.target.checked);

    await chrome.storage.sync.set({
      [STORAGE_KEY]: e.target.checked,
    });

    chrome.tabs.query({ url: ["https://medium.com/*"] }, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id!, { checkState: true });
      });
    });
  };

  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl" width="500px">
        <Grid minH="100vh" p={3}>
          <Flex alignItems="center" justifyContent="end">
            <Img src="/logo192.png" width="18px" height="18px" />
            <ColorModeSwitcher justifySelf="flex-end" />
          </Flex>
          <VStack spacing={8}>
            <Heading size="2xl">Medium Focus Mode</Heading>
            <Switch
              size="lg"
              isChecked={focusMode}
              onChange={handleModeChange}
            />
            <Text>Focus Mode {focusMode ? "Enabled" : "Disabled"}</Text>
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};
