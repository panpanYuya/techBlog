import { DocumentData, onSnapshot, Query } from "firebase/firestore";
import React, { useEffect, useState } from "react";

const useCollection = (collectionRef: Query<DocumentData>) => {
    const [data, setData] = useState<DocumentData[]>([]);
    const [error, setError] = useState<string | null>();
    const getData: DocumentData[] = [];
    useEffect(() => {
        onSnapshot(
            collectionRef,
            (querySnapShot) => {
                querySnapShot.docs.map((doc) => {
                    getData.push(doc.data());
                });
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
