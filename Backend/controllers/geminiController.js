import { createUserContent, GoogleGenAI } from "@google/genai";
import fs from "fs";
import path from "path";
import { json } from "stream/consumers";
const Api = process.env.GEMINI_API_KEY;
const ai = new GoogleGenAI({ Api });

export const PatientDiagnosis = async (req, res) => {
  try {
    const { symptoms, Chronic_illnesses_or_previous_surgeries } = req.body;

    if (!symptoms ) {
      res.json({success:false,message:"symptoms is required"})
    }
    const images = req.files;

    const imageParts = [];
    if (images) {
            for (let i = 0; i < Math.min(images.length, 10); i++) {
   
      try {
        const image = images[i];


        // قراءة الصورة كـ base64
        const imageBuffer = fs.readFileSync(image.path);
        const base64Image = imageBuffer.toString("base64");
        // console.log("base64Image: "+base64Image)

        // تحديد نوع الملف
        // const mimeType = image[i].getMimeType(image.originalname);

        imageParts.push({
          inlineData: {
            data: base64Image,
            mimeType: "image/jpg",
          },
        });

        // حذف الملف المؤقت إذا كنت تستخدم multer
        fs.unlinkSync(image.path);
      } catch (error) {
        console.error(`Error processing image ${i}:`, error);
      }
    }
    }



    // const  models= ai.getGenerativeModel({model: "gemini-3-flash-preview"})
    
//     const prompt= `You are a medical consultant AI for physicians. Provide concise, high-precision analysis.

// PATIENT DATA:
// - Symptoms: ${symptoms}
// - Medical History: ${Chronic_illnesses_or_previous_surgeries}
// - Medical Images: ${imageParts.length} provided

// RESPONSE FORMAT - THREE SECTIONS ONLY:

// 1. PRIMARY DIAGNOSIS:
// [Exact medical condition name]
// [ICD-10 code if applicable]
// [Confidence level: High/Moderate/Low]
// [Key supporting evidence]

// 2. TREATMENT & PRESCRIPTION:
// MEDICATIONS (Exact doses):
// 1. [Drug Name] [Dose] [Route] [Frequency] [Duration]
//    - Indication: [Specific use]
//    - Example: Amoxicillin 500mg PO TID × 7 days for bacterial infection

// 2. [Drug Name] [Dose] [Route] [Frequency] [Duration]
//    - Special instructions: [With food, avoid alcohol, etc.]

// PROCEDURES/THERAPIES:
// - [Specific intervention]
// - [Frequency/Duration]

// FOLLOW-UP: [Timing] for [Specific assessment]

// 3. IMAGE/LAB ANALYSIS (If abnormalities found):
// For each abnormal finding:
// - [Image type]: [Specific finding]
// - [Measurement]: [Exact value with reference range]
// - [Clinical significance]: [Brief interpretation]
// - [Recommendation]: [Further action if needed]

// If all images/labs normal: "All provided images/labs within normal limits."

// CRITICAL: Be precise, concise, evidence-based. Maximum 300 words total. Use medical abbreviations. No explanations unless abnormal findings.`

const prompt=`You are a Clinical Decision Support AI assisting licensed physicians (NOT a replacement for clinical judgment).

Analyze the case and return ONLY a valid JSON object (no text before or after, no explanations).

PATIENT DATA:
- Symptoms: ${symptoms}
- Medical History: ${Chronic_illnesses_or_previous_surgeries}
- Medical Images: ${imageParts.length} provided

IMPORTANT CONSTRAINTS:
- Output MUST be valid JSON only
- Language inside JSON values MUST be Arabic (professional medical Arabic)
- Use medications commonly available in Syrian pharmacies
- Provide probabilistic differential diagnosis
- Keep concise and clinically precise

JSON SCHEMA (STRICT):

{
  "primaryDiagnosis": {
    "name": "string",
    "icd10": "string",
    "probability": number,
    "confidence": "High | Moderate | Low",
    "evidence": ["string"]
  },
  "differentials": [
    {
      "name": "string",
      "probability": number
    }
  ],
  "redFlags": ["string"],

  "treatment": {
    "medications": [
      {
        "name": "string",
        "dose": "string",
        "route": "string",
        "frequency": "string",
        "duration": "string",
        "indication": "string",
        "notes": "string"
      }
    ],
    "procedures": ["string"],
    "followUp": "string"
  },

  "analysis": {
    "status": "normal | abnormal",
    "findings": [
      {
        "type": "string",
        "finding": "string",
        "measurement": "string",
        "reference": "string",
        "significance": "string",
        "recommendation": "string"
      }
    ]
  }
}

RULES:
- Do not include null fields; omit them if not applicable
- Probabilities must be numeric (0–100)
- Ensure JSON is parsable (no trailing commas)
- No markdown, no comments, no extra text`
    const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents:createUserContent([
            prompt,
            ...imageParts
        ])
    });

    const AiData=JSON.parse(response.text);
    res.json({ success:true, AiData})

    // console.log(response.text);
  } catch (error) {
    console.log("error in  PatientDiagnosis" + error.message);
     console.log("error in  PatientDiagnosis" + error);
     res.json({ success:false, message:error.message })
  }
};
