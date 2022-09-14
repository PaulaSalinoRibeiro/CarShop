export default interface IService<T> {
  create(obj: T): Promise<T>
}