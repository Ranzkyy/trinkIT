export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen bg-gradient-to-r from-[#649173] to-[#DBD5A4] flex items-center justify-center">
      <div className="w-full max-w-md">{children}</div>
    </div>
  );
}
