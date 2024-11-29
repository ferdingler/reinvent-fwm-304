// src/App.tsx
import {
  Authenticator,
  Button,
  Flex,
  Heading,
  ThemeProvider,
  View,
} from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import { ResourceDashboard } from "./components/ResourceDashboard";
import { AIPlanner } from "./components/AIPlanner";
import { theme } from "./theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Authenticator>
        {({ signOut }) => (
          <View padding="1rem">
            <Flex
              justifyContent="space-between"
              alignItems="center"
              marginBottom="1rem"
            >
              <Heading level={1}>Engineer Resource Planner</Heading>
              <Button onClick={signOut}>Sign Out</Button>
            </Flex>

            <Flex direction="row" gap="1rem">
              <View flex="2">
                <ResourceDashboard />
              </View>
              <View flex="1">
                <AIPlanner />
              </View>
            </Flex>
          </View>
        )}
      </Authenticator>
    </ThemeProvider>
  );
}

export default App;