import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10mb' }));

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY || '',
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// AI Endpoint for Kentsel Dönüşüm Danışmanı & Yasal Mevzuat
app.post('/api/gemini/kentsel-donusum', async (req, res) => {
  try {
    const { message, history } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Mesaj metni gereklidir.' });
    }

    const systemInstruction = `
Sen AB Yapı firmasının Uzman Kentsel Dönüşüm ve İnşaat Mevzuatı Danışmanısın.
Görevin: İstanbul'da mülk sahibi olan veya evini kentsel dönüşüme sokmak isteyen kullanıcılara Türkiye Cumhuriyeti 6306 Sayılı Kentsel Dönüşüm Kanunu, Yasal Mevzuat, SPK Lisanslı Değerleme, 50%+1 Salt Çoğunluk Kararı, Kira Yardımı, KDV/Harç Muafiyetleri, Deprem Güvenliği ve AB Yapı güvencesi hakkında detaylı, anlaşılır ve profesyonel bilgiler sunmaktır.

Kurumsal Bilgiler:
- Firma Adı: AB Yapı (ab-yapi.com.tr)
- Slogan: Güvene Yükselen Yapılar
- Adres: Marmara Cd. No: 64, Kocamustafapaşa Mah. Fatih / İstanbul
- Telefon & WhatsApp: +90 (551) 010 22 00
- E-posta: info@ab-yapi.com.tr
- Uzmanlık: İstanbul genelinde tarihi yarımada Fatih/Suriçi başta olmak üzere Kadıköy, Üsküdar, Beşiktaş, Bakırköy, Maltepe, Ataşehir, Zeytinburnu bölgelerinde yüksek standartlı kentsel dönüşüm, konut ve ticari yapılar.

Önemli Konular ve Bilgiler:
1. 6306 Sayılı Kanun Son Güncellemeler: Yapı sahiplerinin 50%+1 (salt çoğunluk) ile karar alma hakkı, bina risk tespiti süreci, tebligat süreleri.
2. Devlet Katkıları & Destekler: Kira yardımları (İstanbul için aylık destek tutarları), faiz destekli kentsel dönüşüm kredileri, noter, tapu ve damga vergisi muafiyetleri.
3. AB Yapı Yaklaşımı: Sıfır riskli sözleşmeler, zamanında teslim garantisi, şeffaf paylaşım oranları, yüksek inşaat kalitesi ve A sınıfı enerji verimliliği.

Yanıtlarını Türkçe, kurumsal, güven verici, madde işaretli ve kolay anlaşılır bir üslupla ver. Gerekirse kullanıcıları AB Yapı uzmanlarıyla WhatsApp veya iletişim formu üzerinden görüşmeye davet et.
`;

    const contents = [];
    if (history && Array.isArray(history)) {
      for (const h of history) {
        contents.push({
          role: h.role === 'user' ? 'user' : 'model',
          parts: [{ text: h.content }],
        });
      }
    }
    contents.push({
      role: 'user',
      parts: [{ text: message }],
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const text = response.text || 'Üzgünüz, yanıt üretilemedi. Lütfen tekrar deneyiniz.';
    res.json({ text });
  } catch (error: any) {
    console.error('Gemini API Error:', error);
    res.status(500).json({
      error: 'AI danışman hizmetinde bir aksaklık oluştu.',
      details: error?.message || 'Bilinmeyen hata',
    });
  }
});

// Configure Vite integration for dev mode or static files for prod mode
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'custom',
    });
    app.use(vite.middlewares);
    app.use('*', async (req, res, next) => {
      const url = req.originalUrl;
      try {
        const indexPath = path.resolve(__dirname, 'index.html');
        let indexHtml = fs.readFileSync(indexPath, 'utf-8');
        let template = await vite.transformIndexHtml(url, indexHtml);
        res.status(200).set({ 'Content-Type': 'text/html' }).end(template);
      } catch (e: any) {
        vite.ssrFixStacktrace(e);
        next(e);
      }
    });
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`AB Yapı server running on port ${PORT}`);
  });
}

startServer();
