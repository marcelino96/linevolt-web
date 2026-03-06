# 🤖 Panduan Blog Automation dengan AI — Linevolt

## Cara 1: Semi-Otomatis dengan ChatGPT/Claude (< 5 menit per artikel)

### Step 1: Generate Artikel dengan AI
Copy prompt berikut ke **ChatGPT** atau **Claude**:

```
Kamu adalah SEO content writer untuk perusahaan lighting Indonesia bernama Linevolt, yang spesialis instalasi LED Strip Addressable dan Videotron.

Tulis artikel blog dalam Bahasa Indonesia dengan detail berikut:
- Topik: [ISI TOPIK DI SINI, contoh: "tips memilih power supply LED strip addressable"]
- Target keyword: [ISI KEYWORD, contoh: "power supply LED strip"]
- Panjang: 800-1200 kata
- Format: Markdown (gunakan ## untuk heading, **bold**, *italic*, - untuk list)
- Struktur: Intro → 4-6 section dengan heading ## → Kesimpulan dengan CTA ke Linevolt
- Tone: Profesional tapi mudah dipahami, seperti pakar yang menjelaskan ke klien

Di akhir artikel, jangan lupa tulis: "Konsultasikan kebutuhan lighting Anda dengan tim Linevolt — gratis dan tanpa komitmen."
```

### Step 2: Isi ke Admin Dashboard
1. Buka `linevolt.id/admin` → login
2. Klik tab **Blog**
3. Klik **+ Tulis Artikel**
4. Isi form:
   - **Judul**: Copy dari hasil AI
   - **Excerpt**: 1-2 kalimat ringkasan
   - **Konten**: Paste semua isi artikel dari AI
   - **Tags**: misal `LED Strip, Tutorial, Tips`
   - **Estimasi Baca**: `5 menit`
5. Klik **Simpan & Publish** ✅

---

## Cara 2: Full Otomatis dengan GitHub Actions + OpenAI API

### Yang Dibutuhkan
- OpenAI API Key (dari platform.openai.com, ~$0.01–0.05 per artikel)
- Akses ke server/Vercel (untuk expose API endpoint)

### Arsitektur

```
GitHub Actions (cron weekly)
  → OpenAI API (generate artikel)
  → POST ke /api/admin/blog
  → Artikel auto-publish di website
```

### Setup

**1. Buat file `.github/workflows/auto-blog.yml`:**

```yaml
name: Auto Blog Post

on:
  schedule:
    - cron: '0 7 * * 1'  # Setiap Senin jam 07:00 WIB
  workflow_dispatch:      # Bisa trigger manual

jobs:
  generate-post:
    runs-on: ubuntu-latest
    steps:
      - name: Generate & Publish Blog Post
        run: |
          python3 << 'EOF'
          import urllib.request
          import json
          import datetime

          # Topics bergilir
          topics = [
            "cara merawat instalasi LED strip addressable agar awet",
            "perbedaan videotron indoor dan outdoor untuk pemula",
            "DMX lighting: panduan dasar untuk venue dan stage",
            "tips hemat energi pada sistem LED strip komersial",
          ]
          
          week = datetime.date.today().isocalendar()[1]
          topic = topics[week % len(topics)]

          # Generate dengan OpenAI
          prompt = f"Tulis artikel blog SEO Bahasa Indonesia 900 kata format Markdown tentang: {topic}. Untuk website Linevolt, spesialis LED Strip Addressable dan Videotron di Indonesia."
          
          req = urllib.request.Request(
            "https://api.openai.com/v1/chat/completions",
            data=json.dumps({"model":"gpt-4o-mini","messages":[{"role":"user","content":prompt}]}).encode(),
            headers={"Authorization":f"Bearer ${{ secrets.OPENAI_API_KEY }}","Content-Type":"application/json"}
          )
          resp = json.loads(urllib.request.urlopen(req).read())
          content = resp["choices"][0]["message"]["content"]
          title = content.split("\n")[0].replace("# ","")
          slug = title.lower()[:50].replace(" ","-").replace("/","")
          
          # Publish ke website
          post = {"slug":slug,"title":title,"excerpt":content[:200],"content":content,"tags":"LED Strip, Tips","publishedAt":datetime.date.today().isoformat(),"readTime":"6 menit","author":"Tim Linevolt","coverImage":""}
          req2 = urllib.request.Request(
            "${{ secrets.SITE_URL }}/api/admin/blog",
            data=json.dumps({"action":"save","post":post}).encode(),
            headers={"Content-Type":"application/json","x-admin-password":"${{ secrets.ADMIN_PASSWORD }}"}
          )
          urllib.request.urlopen(req2)
          print(f"✅ Published: {title}")
          EOF
```

**2. Set GitHub Secrets:**
- `OPENAI_API_KEY` → API key dari OpenAI
- `ADMIN_PASSWORD` → Password admin Linevolt
- `SITE_URL` → `https://linevolt.id`

**3. Enable GitHub Actions** → Done! Artikel auto-publish setiap Senin.

---

## Content Calendar — 3 Bulan Pertama

| Minggu | Topik | Keyword Target |
|--------|-------|----------------|
| 1 | Panduan instalasi LED strip addressable | instalasi LED strip WS2812B |
| 2 | Biaya videotron permanen 2025 | harga videotron Indonesia |
| 3 | Perbedaan LED strip addressable vs biasa | LED strip addressable adalah |
| 4 | 5 kesalahan instalasi LED strip | tips instalasi LED strip |
| 5 | Controller videotron indoor vs outdoor | controller videotron |
| 6 | Lighting restoran yang baik | desain lighting restoran |
| 7 | Power supply LED strip: cara memilih | power supply LED strip |
| 8 | DMX lighting untuk stage | DMX lighting Indonesia |
| 9 | Pixel pitch videotron: panduan memilih | pixel pitch adalah |
| 10 | LED strip untuk outdoor: IP rating | LED strip outdoor waterproof |
| 11 | Biaya instalasi stage lighting | harga stage lighting |
| 12 | Case study: lighting bar premium | lighting bar Jakarta |

---

## Tips SEO untuk Tiap Artikel

1. **Keyword di judul** — masukkan keyword utama di 60 karakter pertama judul
2. **Excerpt mengandung keyword** — excerpt dipakai sebagai meta description
3. **Heading bertanya** — pakai format "Bagaimana...", "Apa itu...", "Berapa..." untuk featured snippets
4. **CTA di akhir** — selalu tutup dengan tombol konsultasi WhatsApp
5. **Link internal** — di dalam artikel, link ke artikel Linevolt lain yang relevan

---

## GEO (AI Search) Optimization Tips

Agar Linevolt muncul di jawaban ChatGPT, Gemini, dan Perplexity:

1. ✅ **FAQ Schema** — sudah diimplementasi di website (8 pertanyaan + jawaban)
2. ✅ **LocalBusiness Schema** — sudah include geo, hours, area served
3. ✅ **Article Schema** — sudah otomatis di setiap artikel blog
4. ⬜ **Google Business Profile** — daftarkan di business.google.com (GRATIS, dampak besar)  
5. ⬜ **Direktori bisnis** — daftarkan di Ralali, Indotrading, Tokopedia Business
6. ⬜ **Review Google Maps** — minta klien satisfied untuk review bintang 5
7. ⬜ **Backlink dari supplier** — minta Advatek Lighting mention Linevolt sebagai Indonesia dealer
