// import itemsRepository from "@/repositories/itemsRepository";
import itemsRepository from "../../repositories/itemsRepository";

async function findMostOrderedItems(id: number) {
  const mostOrdered = await itemsRepository.findMostOrderedItems(id);

  return mostOrdered;
}

const itemsService = {
  findMostOrderedItems,
};

export default itemsService;
