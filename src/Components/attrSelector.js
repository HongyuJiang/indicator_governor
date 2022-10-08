import { Tag } from 'antd';
import React, { useState, useImperativeHandle, forwardRef, useEffect } from 'react';
const { CheckableTag } = Tag;

import './attrSelector.css';

const attrSelector = forwardRef((props, ref) => {

  const [selectedTags, setSelectedTags] = useState([]);
  const [groupStore, setGroupStore] = useState({});

  const { updateCheckedAttrs } = props
  let { attrsCandidates } = props
  attrsCandidates = attrsCandidates || []

  useImperativeHandle(ref, () => ({
    resetAttr: (prevId, curId) => {
      let newStore = { ...groupStore }
      newStore[prevId] = selectedTags
      setGroupStore(newStore)

      if (curId in groupStore) {
        setSelectedTags(groupStore[curId])
      }
      else {
        setSelectedTags([])
      }
    },
  }));

  const handleChange = (tag, checked) => {
    const nextSelectedTags = checked ? [...selectedTags, tag] : selectedTags.filter((t) => t !== tag);
    setSelectedTags(nextSelectedTags);
  };

  useEffect(() => {
    const checkedAttrs = attrsCandidates.filter((attr) => selectedTags.indexOf(attr.name) > -1)
    updateCheckedAttrs(checkedAttrs)
  }, [selectedTags])

  return (
    <div className='attrSelector'>
      <div className='hint'> 点亮需要使用的属性 </div>
      {attrsCandidates.map((tag) => (
        <CheckableTag
          key={tag.name}
          checked={selectedTags.indexOf(tag.name) > -1}
          onChange={(checked) => handleChange(tag.name, checked)}
        >
          {tag.name}
        </CheckableTag>
      ))}
    </div>
  );
});

export default attrSelector;