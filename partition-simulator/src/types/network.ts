export interface NetworkConfig {}

export interface Node<Id = string> {
  readonly id: Id;
  readonly label: string;
}

export interface Edge<Id = string> {
  readonly from: Id;
  readonly to: Id;
}

export interface NetworkProps<Id> {
  nodes?: Array<Node<Id>>;
  edges?: Array<Edge<Id>>;
  nodesFn?: (nodes: Array<Node<Id>>) => Promise<Array<Node<Id>>>;
  edgesFn?: (edges: Array<Edge<Id>>) => Promise<Array<Edge<Id>>>;
}
