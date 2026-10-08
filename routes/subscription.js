const express=require("express");
const router=express.Router();
const c=require("../controllers/subscriptionController");

router.get("",c.getSubscriptions);
router.get("/:id",c.getSubscriptionById);
router.post("",c.insertSubscription);
router.put("/:id",c.updateSubscription);
router.delete("/:id",c.deleteSubscription);
module.exports=router;