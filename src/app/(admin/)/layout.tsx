import React from 'react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section>
      {/* Include a shared UI here e.g. a header or sidebar */}
      <nav></nav>
 
      {children}
    </section>
  );
}
