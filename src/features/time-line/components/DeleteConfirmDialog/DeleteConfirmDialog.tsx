import type { FC } from "react";

type Props = {
  onConfirm: () => void;
  onCancel: () => void;
  isDeleting: boolean;
};

export const DeleteConfirmDialog: FC<Props> = ({
  onConfirm,
  onCancel,
  isDeleting,
}) => {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/60"
      onClick={onCancel}
    >
      <div
        className="w-80 border-4 border-foreground bg-card shadow-[8px_8px_0_0_var(--color-accent)]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="border-b-4 border-foreground bg-foreground px-4 py-2 text-center">
          <span className="font-display text-[10px] uppercase tracking-widest text-accent">
            !! System Message !!
          </span>
        </div>

        <div className="px-6 py-6">
          <p className="font-mono text-base leading-relaxed">
            &gt; この投稿を削除しますか？
          </p>
          <p className="mt-1 font-mono text-sm text-muted-foreground">
            削除したデータは戻りません。
          </p>

          <div className="mt-6 flex flex-col gap-1 border-t-2 border-dashed border-foreground pt-4">
            <button
              type="button"
              onClick={onConfirm}
              disabled={isDeleting}
              className="flex items-center gap-2 px-2 py-1 font-mono text-sm text-destructive hover:bg-destructive/10 disabled:opacity-50"
            >
              <span className="w-4 text-destructive">▶</span>
              {isDeleting ? "削除中..." : "はい、削除する"}
            </button>
            <button
              type="button"
              onClick={onCancel}
              disabled={isDeleting}
              className="flex items-center gap-2 px-2 py-1 font-mono text-sm hover:bg-secondary disabled:opacity-50"
            >
              <span className="w-4 text-muted-foreground">▷</span>
              いいえ、やめる
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
