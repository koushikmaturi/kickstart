# kickstart
***

Kickstart is a DeFi application similar to Indiegogo and Kickstarter. The intention of my application is to tackle some of the security
drawbacks in the existing applications like:
  1. Transparency of expenditure made by people creating kickstart campaign.
  2. Contributors do not have a say in how the capital is spent. 

These two factors provide way too much power to the campaign creators, possibly creating opportunities for misuse. The Kickstart application
uses a mechanism where the campaign creators (managers) need to create expenditure requests for spending money. Then, the requests are voted
on by the contributors. The requests are approved after gaining 50% approvals from the contributors. This approach solves the problem, but it
creates an active responsibility for the contributors. So, I created a minimum contribution parameter, which is set by the campaign manager.
Only the contributors who meet the minimum value can become approvers.

The blockchain side is programmed in Solidity, the source code and tests can be found in the `etheruem` directory. The frontend is developed
using JavaScript React and specifically the Next module.
