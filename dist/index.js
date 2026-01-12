import express from 'express';
import jwt from 'jsonwebtoken';
import mongoose, { connect } from 'mongoose';
import bcrypt from 'bcrypt';
import { contentModel, linkModel, userModel } from './db.js';
import { authUser } from './middleware.js';
import { random } from './utils.js';
const app = express();
app.use(express.json());
app.post('/api/v1/signup', async (req, res) => {
    try {
        // we should usee zod validation here
        const username = req.body.username;
        const password = req.body.password;
        if (!username || !password) {
            return res.json({
                success: false,
                msg: "missing details"
            });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const user = await userModel.create({
            username,
            password: hashedPass
        });
        const token = await jwt.sign({ id: user._id }, "asjuids");
        return res.json({
            success: true,
            token,
            msg: 'user signed up'
        });
    }
    catch (error) {
        console.error(error);
        if (error.code === 11000) {
            return res.json({
                success: false,
                msg: "username already exist"
            });
        }
        return res.json({
            success: false,
            msg: error.message
        });
    }
});
app.post('/api/v1/signin', async (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    const user = await userModel.findOne({ username });
    if (user) {
        const passMatch = await bcrypt.compare(password, user.password);
        if (passMatch) {
            const token = await jwt.sign({ id: user._id }, process.env.JWT_SECRET);
            return res.json({
                success: true,
                token
            });
        }
        else {
            return res.json({
                success: false,
                msg: 'password incorrect'
            });
        }
    }
    else {
        return res.json({
            success: false,
            msg: 'user doesnt exist'
        });
    }
});
app.post('/api/v1/content', authUser, async (req, res) => {
    try {
        const link = req.body.link;
        const title = req.body.title;
        // userId middleware se aayega
        const userId = req.userId;
        await contentModel.create({
            link,
            tags: [],
            userId,
            title
        });
        return res.json({
            success: true,
            msg: 'content added'
        });
    }
    catch (error) {
        return res.json({
            success: false,
            msg: error.message
        });
    }
});
app.get('/api/v1/content', authUser, async (req, res) => {
    try {
        const userId = req.userId;
        const content = await contentModel.find({ userId: userId }).populate('userId', 'username');
        res.json({
            success: true,
            content
        });
    }
    catch (error) {
        return res.json({
            success: false,
            msg: error.message
        });
    }
});
app.delete('/api/v1/content', authUser, async (req, res) => {
    try {
        const contentId = req.body.contentId;
        await contentModel.deleteMany({ contentId,
            userId: req.userId
        });
        return res.json({
            success: true,
            msg: 'deleted'
        });
    }
    catch (error) {
    }
});
app.post('/api/v1/brain/share', authUser, async (req, res) => {
    try {
        const share = req.body.share;
        if (share) {
            const hash = random(10);
            await linkModel.create({
                userId: req.userId,
                hash
            });
            return res.json({
                shareableLink: '/share/' + hash
            });
        }
        else {
            await linkModel.deleteOne({ userId: req.userId });
            return res.json({
                success: true,
                message: 'removed Shareable Link'
            });
        }
    }
    catch (error) {
    }
});
app.get('/api/v1/brain/:shareLink', async (req, res) => {
    try {
        const hash = req.params.shareLink;
        const link = await linkModel.findOne({ hash });
        if (!link) {
            return res.status(411).json({
                message: 'Sorry Wrong Input'
            });
        }
        // user detail le lo
        const user = await userModel.findById(link.userId);
        if (!user) {
            return res.status(411).json({
                message: 'user not found, error should ideally not happen'
            });
        }
        const content = await contentModel.findOne({ userId: link.userId });
        return res.json({
            username: user.username,
            content
        });
    }
    catch (error) {
    }
});
app.listen(3000);
//# sourceMappingURL=index.js.map