"use server";
import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
  limit,
  orderBy,
  startAfter,
  getCountFromServer,
  and,
} from "firebase/firestore";
import { db } from "@/firebase";

type lastDocs = {
  lastDoc1: string | null | number;
  lastDoc2: string | null | number;
  lastDoc3: string | null | number;
};

export async function getListingsByUserId(userId: string, pageSize: number, lastDocs: lastDocs) {
  console.log(lastDocs)
  let table1Docs: any = [];
  let table2Docs: any = [];
  let table3Docs: any = [];
  let lastDoc1: string | null | number = lastDocs.lastDoc1
  let lastDoc2: string | null | number = lastDocs.lastDoc2
  let lastDoc3: string | null | number = lastDocs.lastDoc3
  let table1Count = 0;
  let table2Count = 0;
  let table3Count = 0;

  try {
    while (((table1Count + table2Count + table3Count) < pageSize)
      || (typeof lastDoc1 !== 'number' && typeof lastDoc2 !== 'number' && typeof lastDoc3 !== 'number')) {


      if (typeof lastDoc1 !== 'number' && ((table1Count + table2Count + table3Count) < pageSize)) {
        console.log('here !!! ')
        const table1Query = query(
          collection(db, "Handmades"),
          where("userId", "==", userId),
          orderBy("id"),
          startAfter(lastDoc1 || 0),
          limit(1)
        );
        const table1Snapshot = await getDocs(table1Query);
        if (!table1Snapshot.empty) {
          table1Snapshot.forEach((doc) => {
            table1Docs.push({ ...doc.data(), id: doc.id });
            lastDoc1 = doc.id;
            table1Count++;
          });
        } else {
          lastDoc1 = 0;
        }
      }

      if (typeof lastDoc2 !== 'number' && ((table1Count + table2Count + table3Count) < pageSize)) {
        const table2Query = query(
          collection(db, "Sports"),
          where("userId", "==", userId),
          orderBy("id"),
          startAfter(lastDoc2 || ""),
          limit(1)
        );
        const table2Snapshot = await getDocs(table2Query);
        if (!table2Snapshot.empty) {
          table2Snapshot.forEach((doc) => {
            table2Docs.push({ ...doc.data(), id: doc.id });
            lastDoc2 = doc.id;
            table2Count++;
          });
        } else {
          lastDoc2 = 0
        }
      }

      if (typeof lastDoc3 !== 'number' && ((table1Count + table2Count + table3Count) < pageSize)) {
        const table3Query = query(
          collection(db, "Guides"),
          where("userId", "==", userId),
          orderBy("id"),
          startAfter(lastDoc3 || ""),
          limit(1)
        );
        const table3Snapshot = await getDocs(table3Query);
        if (!table3Snapshot.empty) {
          table3Snapshot.forEach((doc) => {
            table3Docs.push({ ...doc.data(), id: doc.id });
            lastDoc3 = doc.id;
            table3Count++;
          });
        } else {
          lastDoc3 = 0
        }
      }

      if (((table1Count + table2Count + table3Count) >= pageSize)) {
        break
      }

      if (((typeof lastDoc1 === 'number' && typeof lastDoc2 === 'number' && typeof lastDoc3 === 'number'))) {
        break
      }
    }

    const result = {
      Handmades: table1Docs,
      Sports: table2Docs,
      Guides: table3Docs,
      lastDoc1,
      lastDoc2,
      lastDoc3,
    };

    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error retrieving documents:", error);
    throw error;
  }
}

export async function countDocumentsWithStatusTrue(collectionName: string, userId: string) {
  try {
    let active = 0
    let pending = 0
    let disabled = 0
    let inProgress = 0
    const collectionRef = collection(db, collectionName);

    const statusActive = query(
      collectionRef,
      where("userId", "==", userId),
      where("status", "==", true),
    );
    const snapshotActive = await getCountFromServer(statusActive);
    active = snapshotActive.data().count;


    const statusPending = query(
      collectionRef,
      where("userId", "==", userId),
      where("status", "==", false),
      where("disabled", "==", false)
    );
    const snapshotPending = await getCountFromServer(statusPending);
    pending = snapshotPending.data().count;

    const statusDisabled = query(
      collectionRef,
      where("userId", "==", userId),
      where("status", "==", false),
      where("disabled", "==", true)
    );
    const snapshotDisabled = await getCountFromServer(statusDisabled);
    disabled = snapshotDisabled.data().count;

    const statusInProgress = query(
      collectionRef,
      where("userId", "==", userId),
      where("disabled", "==", false),
      where("sold", "==", true)
    );
    const snapshotInProgress = await getCountFromServer(statusInProgress);
    inProgress = snapshotInProgress.data().count;

    return { active, pending, disabled, inProgress }
  } catch (error) {
    console.error("Error counting documents:", error);
    throw error;
  }
}

export async function getCountItems(userId: string) {
  try {
    const handmadeCount = await countDocumentsWithStatusTrue("Handmades", userId);
    const sportsCount = await countDocumentsWithStatusTrue("Sports", userId);
    const guidesCount = await countDocumentsWithStatusTrue("Guides", userId);
    const active = handmadeCount.active + sportsCount.active + guidesCount.active
    const pending = handmadeCount.pending + sportsCount.pending + guidesCount.pending
    const disabled = handmadeCount.disabled + sportsCount.disabled + guidesCount.disabled
    const inProgress = handmadeCount.inProgress + sportsCount.inProgress + guidesCount.inProgress
    const result = { active, pending, disabled, inProgress }
    return JSON.parse(JSON.stringify(result));
  } catch (error) {
    console.error("Error counting documents:", error);
    throw error;
  }
}