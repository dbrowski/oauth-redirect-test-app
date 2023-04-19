import { Box, Button, Card, IconButton, Image, Text } from "@pingux/astro";
// import Icon from "@mdi/react/Icon";
import { mdiContentCopy } from "@mdi/js";
import { ContentCopyIcon } from "@mdi/react";
import Icon from "@mdi/react";
import { useEffect, useState } from "react";

function App() {
  const location = window.location;
  const queryParam = location.search;

  const url = location.toString();
  let tokenValue;
  const [codeValue, setCodeValue] = useState("~00000000-fa0b-4fa7-bdf6-e32046e0b3d3~")

  useEffect(() => {
    const code = queryParam.replace("?", "");
    const codeValueMatch = queryParam.match(/(?<=code=)([\w-]+[^&])/g);
    const codeVal = codeValueMatch || "~00000000-fa0b-4fa7-bdf6-e32046e0b3d3~";
    tokenValue = queryParam.match(/token=(\w+-)+[^&]/g);

    setCodeValue(codeVal);
    console.log(codeValueMatch);
    console.log(codeValue);
  });


  const copyToClipboard = (event) => {
    try {
      navigator.clipboard.writeText(codeValue);
    } catch (e) {
      console.error("failed to copy to clipboard");
    }
  };
  const getURLInfo = () => {
    if (codeValueMatch?.length > 0) {
      codeValue = codeValueMatch[0];
    }
  };




  // if (!codeValueMatch) {
  //   return (
  //     <Box>
  //       <h1>
  //         Use this app's url as the redirect URI/URL in your Identity Provider's OAuth app configuration.
  //       </h1>
  //     </Box>
  //   );
  // }

  return (
    <div className="App">
      <Box sx={{ paddingLeft: "35vw", paddingRight: "35vw", paddingBottom: "55vh", paddingTop: "10vh", height: "100vh", bg: "#ffffff" }}>
        <Card
          onPress={() => console.log('card pressed')}
          tabIndex="0"
        >
          <Image src="/PIC-Horizontal-Logo-Primary.jpg" alt="Ping Identity Logo" className="" sx={{ width: "10vw", marginLeft: "auto", marginRight: "auto", paddingBottom: "15%", paddingTop: "5%" }} />
          <Text fontSize="xx" fontWeight="3" sx={{ marginLeft: "auto", marginRight: "auto" }}>Your Authorization Code:</Text>
          <Box sx={{ paddingTop: "3vh" }}>
            {/* <IconButton>
              <Icon path={mdiContentCopy} size={.75} />
            </IconButton> */}
            <Button variant="text" onPress={copyToClipboard} sx={{
              bg: "#FFFFFF", marginLeft: "auto", marginRight: "auto",
              "&:focus-visible": {
                boxShadow: 'none',
                outline: '0',
              },
              "&.is-pressed": {
                bg: '#eeeeee'
              },
            }}>
              <Box isRow alignItems="center">
                <Text fontSize="lg" fontWeight="0" style={{ "color": "#000000" }}>
                  {codeValue}
                </Text>
                <Icon path={mdiContentCopy} size={.75} style={{ color: "#000000" }} />
              </Box>
            </Button>
          </Box>
          {tokenValue ? (<><h3>your token</h3>
            <h5>{tokenValue?.toString()}</h5></>) : ""}
        </Card>

      </Box>
    </div>
  );
}

export default App;
