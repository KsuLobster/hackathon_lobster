import * as functions from "firebase-functions";
import axios from "axios";
import * as cors from "cors";

const OPENAI_API_KEY = functions.config().openai.api_key;
const corsHandler = cors({origin: true});

exports.askAssistant = functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const {message} = req.body;

    try {
      if (!message) {
        res.status(400).json({error: "質問内容がありません"});
        return;
      }

      const response = await axios.post(
        "https://api.openai.com/v1/engines/gpt-3.5-turbo/completions",
        {
          model: "gpt-3.5-turbo",
          messages: [
            {
              "role": "system",
              "content": "日本語で返答してください",
            },
            {
              "role": "user",
              "content": message,
            },
          ],
        },
        {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${OPENAI_API_KEY}`,
          },
        }
      );
      const assistantMessage = response.data.choices[0].message.content;

      res.json({message: assistantMessage});
    } catch (error) {
      console.error(error);
      res.status(500).json({error: "エラーが発生しました。"});
    }
  });
});
