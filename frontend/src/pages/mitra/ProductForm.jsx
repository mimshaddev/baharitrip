import { useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Check,
  Image as ImageIcon,
  Plus,
  Trash2,
  Sparkles,
} from "lucide-react";
import {
  DashboardLayout,
  Card,
} from "../../components/dashboard/DashboardLayout";
import { mitraNav } from "./nav";
import { operatorProducts } from "../../lib/mockData";
import { Toaster, toast } from "sonner";

const steps = [
  { id: 1, title: "Detail Produk", desc: "Nama, kategori, deskripsi" },
  { id: 2, title: "Harga & Kapasitas", desc: "Pricing dan slot tamu" },
  { id: 3, title: "Jadwal", desc: "Default & blackout dates" },
  { id: 4, title: "Foto", desc: "Galeri produk" },
  { id: 5, title: "Tinjauan", desc: "Review sebelum publish" },
];

const Field = ({ label, children, required, hint }) => (
  <div>
    <label className="text-[11px] uppercase tracking-[0.18em] text-[#64748B] font-medium flex items-center gap-1">
      {label}
      {required ? <span className="text-[#E05D36]">*</span> : null}
    </label>
    {hint ? <p className="text-[11px] text-[#64748B] mt-1">{hint}</p> : null}
    <div className="mt-2">{children}</div>
  </div>
);

const Input = ({ ...props }) => (
  <input
    {...props}
    className="w-full bg-[#FAF8F5] border border-[#E5DCC5] rounded-xl px-4 py-3 text-sm text-[#0A1929] outline-none focus:border-[#005F73] focus:bg-white transition-colors"
  />
);

const Textarea = ({ ...props }) => (
  <textarea
    {...props}
    className="w-full bg-[#FAF8F5] border border-[#E5DCC5] rounded-xl px-4 py-3 text-sm text-[#0A1929] outline-none focus:border-[#005F73] focus:bg-white transition-colors resize-none"
  />
);

const Select = ({ children, ...props }) => (
  <select
    {...props}
    className="w-full bg-[#FAF8F5] border border-[#E5DCC5] rounded-xl px-4 py-3 text-sm text-[#0A1929] outline-none focus:border-[#005F73] focus:bg-white transition-colors"
  >
    {children}
  </select>
);

const Stepper = ({ current, onStepClick }) => (
  <div className="bg-white border border-[#E5DCC5] rounded-2xl p-4 md:p-6 mb-6">
    <ol className="flex items-center justify-between gap-2 overflow-x-auto">
      {steps.map((s, i) => {
        const done = current > s.id;
        const active = current === s.id;
        return (
          <li
            key={s.id}
            className="flex items-center gap-3 flex-1 min-w-fit"
          >
            <button
              data-testid={`step-${s.id}`}
              onClick={() => onStepClick(s.id)}
              className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center text-xs font-medium transition-colors ${
                done
                  ? "bg-[#005F73] text-white"
                  : active
                  ? "bg-[#0A1929] text-white"
                  : "bg-[#F0EBE1] text-[#64748B]"
              }`}
            >
              {done ? <Check size={14} /> : s.id}
            </button>
            <div className="hidden md:block">
              <p
                className={`text-xs font-medium ${
                  active ? "text-[#0A1929]" : "text-[#64748B]"
                }`}
              >
                {s.title}
              </p>
              <p className="text-[10px] text-[#64748B] mt-0.5">{s.desc}</p>
            </div>
            {i < steps.length - 1 ? (
              <span className="hidden md:block flex-1 h-px bg-[#E5DCC5] mx-2" />
            ) : null}
          </li>
        );
      })}
    </ol>
  </div>
);

const SAMPLE_IMAGES = [
  "https://images.pexels.com/photos/13010777/pexels-photo-13010777.jpeg",
  "https://images.pexels.com/photos/10769610/pexels-photo-10769610.jpeg",
  "https://images.unsplash.com/photo-1755020475254-06790e2437b4?crop=entropy&cs=srgb&fm=jpg&q=85",
];

export default function ProductForm({ mode = "create" }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const existing = id ? operatorProducts.find((p) => p.id === id) : null;
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    name: existing?.name || "",
    category: existing?.category || "Diving",
    description: "",
    inclusions: "",
    duration: "1 hari",
    location: "Tomia, Wakatobi",
    price: existing?.price?.replace(/\D/g, "") || "",
    minGuests: 1,
    maxGuests: 6,
    schedules: ["Senin", "Rabu", "Sabtu"],
    images: existing ? [existing.img] : [],
  });

  const [imageInput, setImageInput] = useState("");

  const update = (k, v) => setForm({ ...form, [k]: v });

  const next = () => {
    if (step < steps.length) setStep(step + 1);
  };
  const prev = () => {
    if (step > 1) setStep(step - 1);
  };

  const handlePublish = () => {
    toast.success(
      mode === "edit"
        ? `Produk ${form.name} berhasil diperbarui`
        : `Produk ${form.name || "baru"} berhasil dipublikasikan`
    );
    setTimeout(() => navigate("/dashboard/mitra/produk"), 800);
  };

  const handleSaveDraft = () => {
    toast.success("Disimpan sebagai draf");
  };

  const toggleSchedule = (day) => {
    const exists = form.schedules.includes(day);
    update("schedules", exists ? form.schedules.filter((d) => d !== day) : [...form.schedules, day]);
  };

  const addImage = (url) => {
    if (!url || form.images.includes(url)) return;
    update("images", [...form.images, url]);
    setImageInput("");
  };

  const removeImage = (url) => {
    update("images", form.images.filter((i) => i !== url));
  };

  return (
    <DashboardLayout
      role="mitra"
      navItems={mitraNav}
      breadcrumb={`Mitra · Produk · ${mode === "edit" ? "Edit" : "Baru"}`}
      title={mode === "edit" ? `Edit ${existing?.name || ""}` : "Produk baru"}
    >
      <Toaster position="top-center" richColors />

      <Link
        to="/dashboard/mitra/produk"
        data-testid="back-to-products"
        className="inline-flex items-center gap-1.5 text-sm text-[#64748B] hover:text-[#0A1929] mb-6 transition-colors"
      >
        <ChevronLeft size={15} /> Kembali ke daftar produk
      </Link>

      <Stepper current={step} onStepClick={setStep} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-7 md:p-8">
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl tracking-tight">Detail produk</h3>
                <p className="text-sm text-[#64748B] mt-1">
                  Mulai dengan nama yang menarik dan deskripsi yang menggambarkan pengalaman.
                </p>
              </div>

              <Field label="Nama produk" required>
                <Input
                  data-testid="form-name"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="contoh: Roma Reef Dive Package 2 Tank"
                />
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Kategori" required>
                  <Select
                    data-testid="form-category"
                    value={form.category}
                    onChange={(e) => update("category", e.target.value)}
                  >
                    {["Diving", "Snorkeling", "Tour", "Penginapan", "Liveaboard"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </Select>
                </Field>
                <Field label="Durasi">
                  <Select
                    data-testid="form-duration"
                    value={form.duration}
                    onChange={(e) => update("duration", e.target.value)}
                  >
                    {["Setengah hari", "1 hari", "2 hari 1 malam", "3 hari 2 malam", "4 hari 3 malam", "1 minggu"].map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </Select>
                </Field>
              </div>

              <Field label="Lokasi" hint="Tampilkan kepada tamu di mana mereka akan bertemu Anda.">
                <Input
                  data-testid="form-location"
                  value={form.location}
                  onChange={(e) => update("location", e.target.value)}
                  placeholder="contoh: Wangi-Wangi, Wakatobi"
                />
              </Field>

              <Field label="Deskripsi" hint="Min. 80 karakter — ceritakan pengalaman dengan rinci.">
                <Textarea
                  data-testid="form-description"
                  rows={5}
                  value={form.description}
                  onChange={(e) => update("description", e.target.value)}
                  placeholder="Selami terumbu karang Roma Reef dengan kedalaman 12-18m..."
                />
              </Field>

              <Field label="Termasuk dalam paket" hint="Pisahkan dengan koma.">
                <Textarea
                  data-testid="form-inclusions"
                  rows={3}
                  value={form.inclusions}
                  onChange={(e) => update("inclusions", e.target.value)}
                  placeholder="Tabung & weight, Pemandu sertifikasi PADI, Asuransi, Lunch box"
                />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl tracking-tight">Harga & kapasitas</h3>
                <p className="text-sm text-[#64748B] mt-1">
                  Tetapkan harga per orang dan jumlah tamu yang dapat dilayani per trip.
                </p>
              </div>

              <Field label="Harga per orang (IDR)" required>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[#64748B]">
                    Rp
                  </span>
                  <input
                    data-testid="form-price"
                    type="number"
                    value={form.price}
                    onChange={(e) => update("price", e.target.value)}
                    placeholder="1.250.000"
                    className="w-full bg-[#FAF8F5] border border-[#E5DCC5] rounded-xl pl-11 pr-4 py-3 text-sm text-[#0A1929] outline-none focus:border-[#005F73] focus:bg-white transition-colors"
                  />
                </div>
              </Field>

              <div className="grid grid-cols-2 gap-5">
                <Field label="Min. tamu">
                  <Input
                    data-testid="form-min-guests"
                    type="number"
                    value={form.minGuests}
                    onChange={(e) => update("minGuests", e.target.value)}
                  />
                </Field>
                <Field label="Maks. tamu" required>
                  <Input
                    data-testid="form-max-guests"
                    type="number"
                    value={form.maxGuests}
                    onChange={(e) => update("maxGuests", e.target.value)}
                  />
                </Field>
              </div>

              <div className="rounded-2xl bg-[#FDF6E3] border border-[#E9D8A6] p-5 flex gap-4">
                <Sparkles size={20} className="text-[#B35A00] shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-[#0A1929]">Tip pricing</p>
                  <p className="text-xs text-[#4B5A69] leading-relaxed mt-1">
                    Operator dengan harga Rp 1,1-1,5 jt untuk paket diving 2 tank di Wakatobi
                    biasanya mendapatkan tingkat konversi 18% lebih tinggi.
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-serif text-lg tracking-tight mb-4">Komisi & pajak</h4>
                <div className="rounded-xl border border-[#E5DCC5] divide-y divide-[#E5DCC5]">
                  <div className="flex justify-between p-4 text-sm">
                    <span className="text-[#4B5A69]">Komisi BahariTrip</span>
                    <span className="font-medium text-[#0A1929]">15%</span>
                  </div>
                  <div className="flex justify-between p-4 text-sm">
                    <span className="text-[#4B5A69]">PPN</span>
                    <span className="font-medium text-[#0A1929]">11%</span>
                  </div>
                  <div className="flex justify-between p-4 text-sm bg-[#FAF8F5]">
                    <span className="text-[#0A1929] font-medium">Net per tamu (estimasi)</span>
                    <span className="font-serif text-lg text-[#005F73]">
                      Rp{" "}
                      {form.price
                        ? Math.round(Number(form.price) * 0.74).toLocaleString("id-ID")
                        : "0"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl tracking-tight">Jadwal default</h3>
                <p className="text-sm text-[#64748B] mt-1">
                  Pilih hari saat trip berlangsung dan tambahkan jam keberangkatan.
                </p>
              </div>

              <Field label="Hari operasional">
                <div className="flex flex-wrap gap-2">
                  {["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"].map((d) => {
                    const active = form.schedules.includes(d);
                    return (
                      <button
                        key={d}
                        data-testid={`day-${d.toLowerCase()}`}
                        onClick={() => toggleSchedule(d)}
                        className={`px-5 py-2.5 rounded-full text-sm font-medium transition-colors ${
                          active
                            ? "bg-[#005F73] text-white"
                            : "bg-[#FAF8F5] border border-[#E5DCC5] text-[#0A1929] hover:bg-[#F0EBE1]"
                        }`}
                      >
                        {d}
                      </button>
                    );
                  })}
                </div>
              </Field>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <Field label="Jam keberangkatan">
                  <Input data-testid="form-start-time" type="time" defaultValue="08:00" />
                </Field>
                <Field label="Jam selesai">
                  <Input data-testid="form-end-time" type="time" defaultValue="17:00" />
                </Field>
              </div>

              <Field label="Blackout dates" hint="Tanggal saat trip tidak tersedia (cuaca, libur, dll)">
                <Input data-testid="form-blackout" placeholder="contoh: 25 Des, 1 Jan, 17 Agu" />
              </Field>

              <Field label="Lead time minimum" hint="Berapa hari sebelumnya tamu harus booking?">
                <Select data-testid="form-lead-time" defaultValue="2">
                  {["1", "2", "3", "5", "7", "14"].map((n) => (
                    <option key={n} value={n}>{n} hari</option>
                  ))}
                </Select>
              </Field>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl tracking-tight">Foto produk</h3>
                <p className="text-sm text-[#64748B] mt-1">
                  Foto pertama akan menjadi cover. Min. 3 foto landscape resolusi tinggi.
                </p>
              </div>

              {/* Dropzone */}
              <button
                data-testid="upload-dropzone"
                onClick={() => addImage(SAMPLE_IMAGES[form.images.length % SAMPLE_IMAGES.length])}
                className="w-full border-2 border-dashed border-[#E5DCC5] hover:border-[#005F73] hover:bg-[#FAF8F5] rounded-2xl p-12 text-center transition-colors group"
              >
                <div className="w-14 h-14 rounded-full bg-[#F0EBE1] group-hover:bg-[#E6F4F1] flex items-center justify-center mx-auto mb-4 transition-colors">
                  <ImageIcon size={22} className="text-[#005F73]" strokeWidth={1.5} />
                </div>
                <p className="font-serif text-lg text-[#0A1929]">
                  Tarik & jatuhkan foto di sini
                </p>
                <p className="text-xs text-[#64748B] mt-1.5">
                  atau klik untuk pilih · JPG, PNG · maks. 5 MB
                </p>
              </button>

              {/* Add by URL */}
              <Field label="atau tambahkan via URL">
                <div className="flex gap-2">
                  <Input
                    data-testid="form-image-url"
                    value={imageInput}
                    onChange={(e) => setImageInput(e.target.value)}
                    placeholder="https://..."
                  />
                  <button
                    data-testid="form-add-image"
                    onClick={() => addImage(imageInput)}
                    className="bg-[#0A1929] hover:bg-[#005F73] text-white rounded-xl px-5 py-3 text-sm font-medium flex items-center gap-2 transition-colors shrink-0"
                  >
                    <Plus size={14} /> Tambah
                  </button>
                </div>
              </Field>

              {/* Gallery */}
              {form.images.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {form.images.map((img, i) => (
                    <div
                      key={img}
                      data-testid={`uploaded-image-${i}`}
                      className="relative group rounded-2xl overflow-hidden border border-[#E5DCC5] aspect-[4/3]"
                    >
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      {i === 0 && (
                        <span className="absolute top-2 left-2 text-[10px] uppercase tracking-[0.18em] bg-white/95 text-[#005F73] rounded-full px-2 py-1 font-medium">
                          Cover
                        </span>
                      )}
                      <button
                        data-testid={`remove-image-${i}`}
                        onClick={() => removeImage(img)}
                        className="absolute top-2 right-2 w-8 h-8 rounded-full bg-white/95 text-[#E05D36] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        aria-label="Hapus"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {step === 5 && (
            <div className="space-y-6">
              <div>
                <h3 className="font-serif text-2xl tracking-tight">Tinjauan akhir</h3>
                <p className="text-sm text-[#64748B] mt-1">
                  Pastikan semua sudah benar sebelum publish.
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden border border-[#E5DCC5]">
                {form.images[0] ? (
                  <div className="aspect-[16/9]">
                    <img src={form.images[0]} alt="" className="w-full h-full object-cover" />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-[#FAF8F5] flex items-center justify-center">
                    <ImageIcon size={28} className="text-[#64748B]" strokeWidth={1.4} />
                  </div>
                )}
                <div className="p-6 space-y-4">
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
                      {form.category}
                    </p>
                    <h4 className="font-serif text-2xl tracking-tight text-[#0A1929] mt-1.5">
                      {form.name || "Nama produk"}
                    </h4>
                    <p className="text-sm text-[#64748B] mt-1">{form.location}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#E5DCC5]">
                    {[
                      { l: "Durasi", v: form.duration },
                      { l: "Kapasitas", v: `${form.minGuests} - ${form.maxGuests} tamu` },
                      { l: "Operasi", v: form.schedules.join(", ") || "—" },
                      {
                        l: "Harga / orang",
                        v: form.price ? `Rp ${Number(form.price).toLocaleString("id-ID")}` : "—",
                      },
                    ].map((it) => (
                      <div key={it.l}>
                        <p className="text-[10px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
                          {it.l}
                        </p>
                        <p className="text-sm font-medium text-[#0A1929] mt-1">{it.v}</p>
                      </div>
                    ))}
                  </div>

                  {form.description && (
                    <div className="pt-4 border-t border-[#E5DCC5]">
                      <p className="text-[10px] uppercase tracking-[0.18em] text-[#64748B] font-medium mb-2">
                        Deskripsi
                      </p>
                      <p className="text-sm text-[#4B5A69] leading-relaxed">{form.description}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="rounded-xl bg-[#E6F4F1] border border-[#B3DCD5] p-5">
                <p className="text-sm font-medium text-[#005F73]">Siap dipublikasikan?</p>
                <p className="text-xs text-[#005F73]/80 mt-1 leading-relaxed">
                  Setelah publish, produk akan ditinjau tim BahariTrip dalam 1×24 jam. Anda akan
                  menerima notifikasi saat sudah tayang di marketplace.
                </p>
              </div>
            </div>
          )}

          {/* Footer actions */}
          <div className="flex items-center justify-between gap-3 mt-10 pt-6 border-t border-[#E5DCC5]">
            <button
              data-testid="form-prev"
              onClick={prev}
              disabled={step === 1}
              className="text-sm font-medium px-5 py-2.5 text-[#64748B] hover:text-[#0A1929] disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5 transition-colors"
            >
              <ChevronLeft size={15} /> Sebelumnya
            </button>

            <div className="flex items-center gap-3">
              <button
                data-testid="form-save-draft"
                onClick={handleSaveDraft}
                className="text-sm font-medium px-5 py-2.5 text-[#0A1929] bg-[#FAF8F5] border border-[#E5DCC5] hover:bg-[#F0EBE1] rounded-full transition-colors"
              >
                Simpan draf
              </button>
              {step < steps.length ? (
                <button
                  data-testid="form-next"
                  onClick={next}
                  className="bg-[#005F73] hover:bg-[#0A9396] text-white rounded-full px-6 py-2.5 text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  Lanjut <ChevronRight size={15} />
                </button>
              ) : (
                <button
                  data-testid="form-publish"
                  onClick={handlePublish}
                  className="bg-[#E05D36] hover:bg-[#C94D29] text-white rounded-full px-6 py-2.5 text-sm font-medium flex items-center gap-2 transition-colors"
                >
                  <Check size={15} /> {mode === "edit" ? "Simpan perubahan" : "Publikasikan"}
                </button>
              )}
            </div>
          </div>
        </Card>

        {/* Preview sidebar */}
        <Card className="p-7 h-fit lg:sticky lg:top-28">
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#64748B] font-medium mb-4">
            Tinjauan langsung
          </p>
          <div className="rounded-xl overflow-hidden border border-[#E5DCC5] mb-4">
            {form.images[0] ? (
              <img
                src={form.images[0]}
                alt=""
                className="w-full aspect-[4/3] object-cover"
              />
            ) : (
              <div className="aspect-[4/3] bg-[#FAF8F5] flex items-center justify-center">
                <ImageIcon size={22} className="text-[#64748B]" strokeWidth={1.4} />
              </div>
            )}
          </div>
          <p className="text-[10px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
            {form.category}
          </p>
          <h4 className="font-serif text-lg tracking-tight text-[#0A1929] mt-1 leading-snug">
            {form.name || "Nama produk Anda"}
          </h4>
          <p className="text-xs text-[#64748B] mt-1">{form.location}</p>
          <div className="mt-4 pt-4 border-t border-[#E5DCC5] flex items-end justify-between">
            <span className="text-[10px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
              Mulai
            </span>
            <span className="font-serif text-xl text-[#005F73]">
              {form.price ? `Rp ${Number(form.price).toLocaleString("id-ID")}` : "Rp ?"}
            </span>
          </div>

          <div className="mt-5 pt-5 border-t border-[#E5DCC5] space-y-2">
            <p className="text-[10px] uppercase tracking-[0.18em] text-[#64748B] font-medium">
              Progres
            </p>
            <div className="w-full bg-[#F0EBE1] rounded-full h-1.5 overflow-hidden">
              <div
                className="h-full bg-[#005F73] transition-all"
                style={{ width: `${(step / steps.length) * 100}%` }}
              />
            </div>
            <p className="text-[11px] text-[#64748B]">
              Langkah {step} dari {steps.length}
            </p>
          </div>
        </Card>
      </div>
    </DashboardLayout>
  );
}
