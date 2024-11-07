import { DocumentData, onSnapshot, Query } from "firebase/firestore";
import { useEffect, useState } from "react";

/**
 *
 * 指定したコレクションのドキュメントを全て取得
 * @param collectionRef query(collection(DB情報, "コレクション名"))
 * @returns Collectionのドキュメントを変換
 */
const useCollection = (collectionRef: Query<DocumentData>) => {
    const [data, setData] = useState<DocumentData[]>([]);
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        onSnapshot(
            collectionRef,
            (querySnapShot) => {
                const getData: DocumentData[] = querySnapShot.docs.map(
                    (doc: DocumentData) => {
                        return doc.data();
                    }
                );
                setData(getData);
                return data;
            },
            (error) => {
                setError(error.message);
            }
        );
    });
    return { data, error };
};

export default useCollection;
