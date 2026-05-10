import dayjs from "dayjs";

/**
 * ISO 8601形式の文字列を "YYYY/MM/DD HH:mm" 形式にフォーマットする
 * 不正な文字列の場合は元の文字列を返す
 */
export const formatTimestamp = (iso: string): string => {
  const d = dayjs(iso);

  if (!d.isValid()) {
    throw new Error(`Invalid date provided to formatTimestamp: "${iso}"`);
  }

  return d.format("YYYY/MM/DD HH:mm");
};
