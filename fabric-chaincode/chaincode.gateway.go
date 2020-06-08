/*

Copyright 2020 Telefónica Digital España. All Rights Reserved.

SPDX-License-Identifier: Apache-2.0

*/
package main

import (
	log "coren-identitycc/src/chaincode/log"
	"errors"
	"fmt"

	"github.com/hyperledger/fabric-chaincode-go/shim"
)

var proxyGateway = "ProxyGateway"

func toChaincodeArgs(args ...string) [][]byte {
	ccArgs := make([][]byte, len(args))
	for i, a := range args {
		ccArgs[i] = []byte(a)
	}
	return ccArgs
}

func (cc *Chaincode) invoke(stub shim.ChaincodeStubInterface, did string, args interface{}) (string, error) {
	log.Infof("[%s][invoke] Invoke chaincode", proxyGateway)

	interact := make(map[string]interface{})
	interact = args.(map[string]interface{})

	log.Debugf("[%s][invoke] Check access to interact for did: %s  and service: %s", proxyGateway, did, interact["did"].(string))
	service, err := cc.getServiceRegistry(stub, did)
	ccName := service.Name
	checkAccess := service.Access[interact["did"].(string)]
	channel := service.Channel

	log.Debugf("[%s][invoke] Access for did: %s  and service: %d", proxyGateway, interact["did"].(string), checkAccess)
	if err != nil {
		log.Errorf("[%s][invoke]*** Error calling service, problem getting service", err.Error())
		return "", err
	}
	if checkAccess < 4 {
		log.Debugf("[%s][invoke] Did: %s has access to service %s, invoking cc", proxyGateway, did, interact["did"].(string))
		log.Debugf("[%s][invoke] Interact for chaincode %s args are  %v", proxyGateway, ccName, interact["args"])
		s := make([]string, len(interact["args"].([]interface{})))
		for i, v := range interact["args"].([]interface{}) {
			s[i] = fmt.Sprint(v)
		}
		s = append(s, did)
		argBytes := toChaincodeArgs(s...)
		response := stub.InvokeChaincode(ccName, argBytes, channel)
		if response.Status != shim.OK {
			fmt.Printf("%v%", string(response.Payload))
			log.Debugf("[%s][invoke] Error invoking chaincode %s", proxyGateway, string(response.Payload))
			return "", errors.New(string(response.Payload))
		}
		log.Debugf("[%s][invoke] Invoke OK, returning result", proxyGateway)
		log.Infof("%v", response.Payload)

		return string(response.Payload), nil
	}

	log.Errorf("[%s][invoke] User %s has not access to this resources", proxyGateway, did)
	err = errors.New("User has not access")
	return "", err

}
