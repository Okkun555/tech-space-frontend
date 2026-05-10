import type { FC } from "react";
import { useTimeLine } from "./useTimeLine";
import { Button } from "@/components/ui/button";
import { PostThread } from "./PostThread";

export const TimeLine: FC = () => {
  const { posts, pagination, page, setPage, isLoading, error, refresh } =
    useTimeLine();

  const totalPages = pagination?.total_pages ?? 1;
  const totalCount = pagination?.total_count ?? 0;
  const canPrev = page > 1;
  const canNext = page < totalPages;

  return (
    <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-10 sm:px-6">
      <section className="border-2 border-foreground bg-foreground text-background shadow-[6px_6px_0_0_var(--color-accent)]">
        <div className="flex flex-wrap items-center gap-3 border-b-2 border-background/30 px-4 py-2">
          <span className="font-display text-[10px] uppercase tracking-widest text-accent">
            ◆
          </span>
          <span className="font-display text-xs uppercase tracking-widest">
            Thread: Timeline
          </span>
          <span className="ml-auto font-mono text-sm text-background/70">
            [ {totalCount} posts ]
          </span>
        </div>
        <div className="flex flex-wrap items-center gap-3 px-4 py-3">
          <p className="font-mono text-base text-background/80">
            &gt; エンジニアたちのつぶやきを覗いてみよう。
          </p>
          <Button
            size="sm"
            variant="accent"
            onClick={() => refresh()}
            className="ml-auto"
          >
            Reload
          </Button>
        </div>
      </section>

      {isLoading && (
        <div className="border-2 border-dashed border-foreground bg-card px-4 py-10 text-center">
          <span className="animate-pulse font-display text-xs uppercase tracking-widest">
            Now Loading...
          </span>
        </div>
      )}

      {error && !isLoading && (
        <div className="border-2 border-destructive bg-card px-4 py-6 text-center shadow-[6px_6px_0_0_var(--color-destructive)]">
          <p className="font-display text-xs uppercase tracking-widest text-destructive">
            ! System Error !
          </p>
          <p className="mt-2 font-mono text-base">
            投稿の読み込みに失敗しました。再読み込みしてください。
          </p>
        </div>
      )}

      {!isLoading && !error && posts.length === 0 && (
        <div className="border-2 border-foreground bg-card px-4 py-10 text-center">
          <p className="font-display text-xs uppercase tracking-widest">
            No Posts Yet
          </p>
          <p className="mt-2 font-mono text-base text-muted-foreground">
            まだ投稿がありません。最初の書き込みを待っています…
          </p>
        </div>
      )}

      {!isLoading && !error && posts.length > 0 && (
        <div className="flex flex-col gap-5">
          {posts.map((post, index) => (
            <div key={post.id} className="flex flex-col gap-3">
              <PostThread post={post} index={index} />
            </div>
          ))}
        </div>
      )}

      {pagination && totalPages > 1 && (
        <nav className="flex items-center justify-between gap-3 border-t-2 border-dashed border-foreground pt-4">
          <Button
            size="sm"
            variant="secondary"
            disabled={!canPrev}
            onClick={() => canPrev && setPage(page - 1)}
          >
            &lt;&lt; Prev
          </Button>
          <span className="font-display text-[11px] uppercase tracking-widest">
            Page {page} / {totalPages}
          </span>
          <Button
            size="sm"
            variant="secondary"
            disabled={!canNext}
            onClick={() => canNext && setPage(page + 1)}
          >
            Next &gt;&gt;
          </Button>
        </nav>
      )}
    </div>
  );
};
