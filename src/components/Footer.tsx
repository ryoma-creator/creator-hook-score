export default function Footer() {
  return (
    <footer className="w-full border-t border-white/10 mt-auto">
      <div className="max-w-4xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-sm text-white/40">
        <p>
          Built by{" "}
          <a
            href="https://github.com/ryoma-creator"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white/60 hover:text-white transition underline underline-offset-2"
          >
            ryouma
          </a>
        </p>
        <p>No data stored — 100% client-side</p>
      </div>
    </footer>
  );
}
