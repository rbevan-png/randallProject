import { VerifiedPermissionsClient, BatchIsAuthorizedCommand } from "@aws-sdk/client-verifiedpermissions";

export const handler = async (event) => {
  const client = new VerifiedPermissionsClient({ region: "us-east-1"});
  
  const policyStoreId = "3Jv2SQ6e7Wepzav3Z69oTA";
  
  const params = {
  "policyStoreId": policyStoreId,
  "requests": [
    {
      "principal": {
        "entityType": "DeathStarData::User",
        "entityId": "Manager"
      },
      "action": {
        "actionType": "DeathStarData::Action",
        "actionId": "SearchPlanets"
      }
    } ,
    {
      "principal": {
        "entityType": "DeathStarData::User",
        "entityId": "Manager"
      },
      "action": {
        "actionType": "DeathStarData::Action",
        "actionId": "ListPeople"
      }
    },
    {
      "principal": {
        "entityType": "DeathStarData::User",
        "entityId": "Mana"
      },
      "action": {
        "actionType": "DeathStarData::Action",
        "actionId": "SearchPerson"
      }
    }
  ]
};


  try {
    const command = new BatchIsAuthorizedCommand(params);
    const response = await client.send(command);
    
    const permissions = {};
    
    response.results.forEach((result) => {
      const actionId = result.request.action.actionId;
      const isAllowed = result.decision === "ALLOW";
      permissions[actionId] = isAllowed;
    });
    
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: permissions
      })
    };
    // return permissions;
  } catch (error) {
    console.log(error)
    return {
      statusCode: 500,
      body: JSON.stringify({
        message: "Error connecting to AVP",
      }),
    };
  }
};
