const { act } = require("react");
const Subscription=require("../models/subscription");


exports.getSubscriptions=async(req,res,next)=>{
    try{
        const subscriptions= await Subscription.find();
        res.status(200).json(subscriptions);
    }
    catch(err){
        next(err);
    }
}
exports.getSubscriptionById=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const subscription= await Subscription.findById(id);
        if(!subscription){
            return res.status(404).json({
                message:"Subscription not found"
            });
        }
        res.status(200).json(subscriptions);
    }
    catch(err){
        next(err);
    }
};

exports.insertSubscription=async(req,res,next)=>{
    try{
        const {service,monthlyCost,renewalDate}=req.body;
        if(!service){
            return res.status(400).json({
                message:"Service not found"
            });
        }
        if(monthlyCost==undefined){
            return res.status(400).json({
                message:"monthlyCoset not found"
            });
        }

        if(!renewalDate){
            return res.status(400).json({
                message:"RenewalDate not found"
            });
        }
        const subscription=await Subscription.create(req.body);
        return res.status(201).json(subscription);
    }
    catch(err){
        next(err);
    }
};

exports.updateSubscription=async(req,res,next)=>{
    try{
        const id=req.params.id;
        if(!isValidObjectId(id)){
            return res.status(400).json({
                message:"Invalid id"
            });
        }
        const subscription=await Subscription.findIdAndUpdate(id,req.body,
            {returnDocument:"after",runValidators:true});
            if(!subscription){
                return res.status(400).json({
                    message:"Subscription not found"
                });
            }
            res.status(200).json(subscription);
    }
    catch(err){
        next(err);
    }
};

exports.deleteSubscription=async(req,res,next)=>{
    try{
        const id=req.params.id;
        const subscription=await Subscription.findByIdAndDelete(id);
        if(!subscription){
            return res.status(400).json({
                message:"Subscription not found"
            });
        }
        res.status(200).json({
            message:"Subscription deleted Sucessfully"
        })
    }
    catch(err){
        next(err);
    }
}