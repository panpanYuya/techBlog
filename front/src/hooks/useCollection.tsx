import { DocumentData, onSnapshot, Query } from "firebase/firestore";
import { useEffect, useState } from "react";

/**
 *
 * 指定したコレクションからリアルタイムでドキュメントを全て取得し、エラーが発生した場合にはエラーメッセージを返却
 * OnSnapshotを使用し、リアルタイムでFirebaseを監視している
 * @param collectionRef: query(collection(DB情報, "コレクション名"))
 * @returns データとエラーメッセージを含むオブジェクト { data, error }
 */
const useCollection = (collectionRef: Query<DocumentData>) => {
    //コレクションから取得したデータを格納するステート
    const [data, setData] = useState<DocumentData[]>([]);
    //エラーメッセージを格納するステート
    const [error, setError] = useState<string | null>();

    useEffect(() => {
        onSnapshot(
            collectionRef,
            (querySnapShot) => {
                const getData: DocumentData[] = querySnapShot.docs.map(
                    (doc: DocumentData) => ({
                        id: doc.id,
                        ...doc.data(),
                    })
                );
                setData(getData);
            },
            (error) => {
                setError(error.message);
            }
        );
    });
    return { data, error };
};

export default useCollection;
