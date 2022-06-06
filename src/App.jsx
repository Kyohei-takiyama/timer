import {
  Flex,
  Grid,
  Heading,
  Stack,
  StackDivider,
  VStack,
} from "@chakra-ui/react";
import { useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Button, ButtonGroup } from "@chakra-ui/react";
import "./App.css";
import { BiTime } from "react-icons/bi";

function App() {
  // ステート
  const [time, setTime] = useState(0);
  const [timerOn, setTimerOn] = useState(false);

  // トースト
  const toast = useToast();

  // タイマーが更新される度に実行
  useEffect(() => {
    let itnterval = null;

    // タイマー処理
    if (timerOn) {
      // カウントアップ
      // setIntervalで0.1秒ずつ追加
      itnterval = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
      console.log(Math.floor((time / 1000) % 60));
      toast({
        title: "残り時間",
        status: "info",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
    } else {
      // カウントストップ
      // setIntervalをクリア
      clearInterval(itnterval);
    }

    // intervalを初期化
    return () => clearInterval(itnterval);
  }, [timerOn]);

  return (
    <Flex
      className="App"
      justifyContent="center"
      align="center"
      flexDirection="column"
    >
      <VStack
        divider={<StackDivider border="none" />}
        align="stretch"
        w={{ base: "90vw", sm: "80vw", md: "70vw", lg: "60vw" }}
        border="1px"
        borderColor="gray.500"
        borderRadius="md"
        p={10}
      >
        <Heading as="h1" size="4xl" noOfLines={1} color="teal.400" mb="10">
          {/* slice(-2)はカウントアップ時に先頭の0を削除するため */}
          <div className="timerCount">
            <span className="timerBox">
              {("0" + Math.floor((time / 60000) % 60)).slice(-2)}
            </span>
            <span> : </span>
            <span className="timerBox">
              {("0" + Math.floor((time / 1000) % 60)).slice(-2)}
            </span>
            <span> : </span>
            <span className="timerBox">
              {("0" + ((time / 10) % 100)).slice(-2)}
            </span>
          </div>
        </Heading>
        <Flex justifyContent="center">
          {!timerOn && time === 0 && (
            <div className="buttonContainer">
              <Button
                className="button"
                p={10}
                colorScheme="teal"
                onClick={() => setTimerOn(true)}
              >
                開始
              </Button>
            </div>
          )}
          {timerOn && (
            <div className="buttonContainer">
              <Button
                className="button"
                p={10}
                colorScheme="teal"
                onClick={() => setTimerOn(false)}
              >
                ストップ
              </Button>
            </div>
          )}
          {!timerOn && time !== 0 && (
            <div className="buttonContainer">
              <Button
                className="button"
                p={10}
                colorScheme="teal"
                onClick={() => setTimerOn(true)}
              >
                再開
              </Button>
            </div>
          )}
          {!timerOn && (
            <div className="buttonContainer">
              <Button
                className="button"
                p={10}
                colorScheme="teal"
                onClick={() => setTime(0)}
              >
                リセット
              </Button>
            </div>
          )}
        </Flex>
      </VStack>
    </Flex>
  );
}

export default App;
