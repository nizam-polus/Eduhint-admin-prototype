import React, { useState, useEffect } from 'react';
import { Tree, Button, Modal, Input } from 'antd';
import type { TreeProps } from 'antd';
import "../../../styles/components/MetadataTree.css";

interface MetadataItem {
  key: string;
  title: string;
  children?: MetadataItem[];
}

const MetadataTree = ({ data, onNodeSelect, onTreeUpdate }: { data: MetadataItem[], onNodeSelect: (key: string) => void, onTreeUpdate: (newData: MetadataItem[]) => void }) => {
  const [treeData, setTreeData] = useState<MetadataItem[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newNodeTitle, setNewNodeTitle] = useState('');
  const [editingNode, setEditingNode] = useState<MetadataItem | null>(null);

  // Initialize treeData with the provided data prop
  useEffect(() => {
    setTreeData(data);
  }, [data]);

  const handleSelect: TreeProps['onSelect'] = (selectedKeys) => {
    const selectedKey = selectedKeys[0];
    onNodeSelect(selectedKey.toString());
  };

  const handleDrop: TreeProps['onDrop'] = (info) => {
    const dropKey = info.node.key as string;
    const dragKey = info.dragNode.key as string;
    const dropPosition = info.dropPosition;
    const dropToGap = info.dropToGap;

    const loop = (data: MetadataItem[], key: string, callback: (item: MetadataItem, index: number, arr: MetadataItem[]) => void) => {
      data.forEach((item, index, arr) => {
        if (item.key === key) {
          return callback(item, index, arr);
        }
        if (item.children) {
          return loop(item.children, key, callback);
        }
      });
    };

    const dataCopy = [...treeData];
    let dragObj: MetadataItem | undefined;

    loop(dataCopy, dragKey, (item, index, arr) => {
      arr.splice(index, 1);
      dragObj = item;
    });

    if (!dragObj) return;

    if (!dropToGap) {
      loop(dataCopy, dropKey, (item) => {
        item.children = item.children || [];
        item.children.push(dragObj!);
      });
    } else if ((info.node.children || []).length > 0 && info.node.expanded && dropPosition === 1) {
      loop(dataCopy, dropKey, (item) => {
        item.children = item.children || [];
        item.children.unshift(dragObj!);
      });
    } else {
      let ar: MetadataItem[] = [];
      let i: number = 0;
      loop(dataCopy, dropKey, (_item, index, arr) => {
        ar = arr;
        i = index;
      });

      if (dropPosition === -1) {
        ar.splice(i, 0, dragObj!);
      } else {
        ar.splice(i + 1, 0, dragObj!);
      }
    }

    setTreeData(dataCopy);
    onTreeUpdate(dataCopy);
  };

  const addNode = () => {
    const newNode: MetadataItem = { key: Date.now().toString(), title: newNodeTitle };
    setTreeData([...treeData, newNode]);
    onTreeUpdate([...treeData, newNode]);
    setNewNodeTitle('');
    setIsModalVisible(false);
  };

  const editNode = () => {
    if (!editingNode) return;

    const updateNodeTitle : any = (nodes: MetadataItem[]) =>
      nodes.map((node) =>
        node.key === editingNode.key ? { ...node, title: newNodeTitle } : { ...node, children: node.children ? updateNodeTitle(node.children) : [] }
      );

    const updatedTreeData = updateNodeTitle(treeData);
    setTreeData(updatedTreeData);
    onTreeUpdate(updatedTreeData);
    setNewNodeTitle('');
    setIsModalVisible(false);
  };

  const showAddModal = () => {
    setNewNodeTitle('');
    setEditingNode(null);
    setIsModalVisible(true);
  };

  const showEditModal = (node: MetadataItem) => {
    setEditingNode(node);
    setNewNodeTitle(node.title);
    setIsModalVisible(true);
  };

  return (
    <div>
      <Button type="primary" onClick={showAddModal} style={{ marginBottom: '10px' }}>
        Add Node
      </Button>
      <Tree
        treeData={treeData}
        fieldNames={{ title: 'title', key: 'key', children: 'children' }}
        onSelect={handleSelect}
        className="custom-metadata-tree"
        draggable
        onDrop={handleDrop}
        titleRender={(node: any) => (
          <div>
            <span>{node.title}</span>
            <Button size="small" onClick={() => showEditModal(node as MetadataItem)} style={{ marginLeft: 8 }}>
              Edit
            </Button>
          </div>
        )}
      />
      <Modal
        title={editingNode ? "Edit Node" : "Add New Node"}
        visible={isModalVisible}
        onOk={editingNode ? editNode : addNode}
        onCancel={() => setIsModalVisible(false)}
      >
        <Input
          value={newNodeTitle}
          onChange={(e) => setNewNodeTitle(e.target.value)}
          placeholder="Enter node title"
        />
      </Modal>
    </div>
  );
};

export default MetadataTree;
