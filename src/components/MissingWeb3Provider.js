import React from "react";
import { Card, Heading, Text, Link } from "rimble-ui"

class MissingWeb3Provider extends React.Component {
    render() {
        return(
            <Card width={"600px"} mx={"auto"} px={4}>
                <Heading.h2>No Web3 Provider Available</Heading.h2>

                <Text>You will need to <Link href="https://chrome.google.com/webstore/detail/metamask/nkbihfbeogaeaoehlefnkodbefgpgknn?hl=en" target="_blank">install MetaMask</Link> to use this dApp.</Text>
            </Card>
        )
    }
}

export default MissingWeb3Provider
