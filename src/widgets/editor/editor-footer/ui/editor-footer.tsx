type EditorFooterProps = {
  className?: string;
};

export async function EditorFooter({ className }: EditorFooterProps) {
  return (
    <footer
      className={`relative flex w-full flex-col items-center justify-center py-[30px] ${className}`}
    >
      2024 © All rights reserved
    </footer>
  );
}
