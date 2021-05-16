---
layout: page
title: Print Series
permalink: /print/
---

### 剑指 Offer 29. 顺时针打印矩阵
`难度` 简单

输入一个矩阵，按照从外向里以顺时针的顺序依次打印出每一个数字。

示例 1：
```
输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
输出：[1,2,3,6,9,8,7,4,5]
```
示例 2：
```
输入：matrix = [[1,2,3,4],[5,6,7,8],[9,10,11,12]]
输出：[1,2,3,4,8,12,11,10,9,5,6,7]
```

限制：

0 <= matrix.length <= 100

0 <= matrix[i].length <= 100

<div class='fig figcenter fighighlight'>
  <img src='/assets/algorithm/print-matrix.gif'>
</div>

```python
class Solution(object):
    def spiralOrder(self, matrix):
        """
        :type matrix: List[List[int]]
        :rtype: List[int]
        """
        if not matrix: return []
        left, right, top, bottom, res = 0, len(matrix[0]) - 1, 0, len(matrix) - 1, []

        while(True):
            for l in range(left, right + 1):
                res.append(matrix[top][l]) 
            top += 1
            if top > bottom:
                break

            for t in range(top, bottom + 1):
                res.append(matrix[t][right])
            right -= 1
            if right < left:
                break    

            for r in range(right, left - 1, -1):
                res.append(matrix[bottom][r])
            bottom -= 1
            if bottom < top:
                break

            for b in range(bottom, top - 1, -1):
                res.append(matrix[b][left])
            left += 1
            if left > right:
                break
        return res
```
`复杂度` 时间：遍历数组O(MN)，空间：打印O(1)

`易忽略的点`从左到右打印后，top 要加1；记得判断break的条件。