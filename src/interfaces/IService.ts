export default interface IService<T> {
  create(obj: T): Promise<T>
  list(): Promise<T[]>
  listOne(id: string): Promise<T | null>
}