// src/components/AIPlanner.tsx
import {
    Button,
    Card,
    Divider,
    Flex,
    ScrollView,
    Text,
  } from "@aws-amplify/ui-react";
  import { AIConversation, createAIHooks } from "@aws-amplify/ui-react-ai";
  import { generateClient } from "aws-amplify/data";
  import ReactMarkdown from "react-markdown";
  import type { Schema } from "../../amplify/data/resource";
  
  const client = generateClient<Schema>();
  const { useAIConversation } = createAIHooks(client);
  
  export function AIPlanner() {
    const [
      {
        data: { messages },
      },
      sendMessage,
    ] = useAIConversation("resourceChat");
  
    const suggestedQuestions = [
      "Who is available for the Website Redesign project next month?",
      "What skills are we missing for current projects?",
      "Show me potential scheduling conflicts in Q3",
      "When can we start the next project with current staffing?",
    ];
  
    return (
      <Card>
        <Flex direction="column" gap="1rem">
          <ScrollView height="500px">
            <AIConversation
              messages={messages}
              handleSendMessage={sendMessage}
              messageRenderer={{
                text: ({ text }) => <ReactMarkdown>{text}</ReactMarkdown>,
              }}
            />
          </ScrollView>
  
          <Divider />
  
          <Text variation="secondary">Suggested Questions:</Text>
          <Flex direction="column" gap="0.5rem">
            {suggestedQuestions.map((question) => (
              <Button
                key={question}
                variation="link"
                fontSize="0.9rem"
                onClick={() => sendMessage({ content: [{ text: question }] })}
                style={{ textDecoration: "underline" }}
              >
                {question}
              </Button>
            ))}
          </Flex>
        </Flex>
      </Card>
    );
  }