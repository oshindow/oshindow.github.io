---
layout: page
title: String
permalink: /string/
---

### 剑指 Offer 58 - I. 翻转单词顺序
输入一个英文句子，翻转句子中单词的顺序，但单词内字符的顺序不变。为简单起见，标点符号和普通字母一样处理。例如输入字符串"I am a student. "，则输出"student. a am I"。

示例 1：
```
输入: "the sky is blue"
输出: "blue is sky the"
```
示例 2：
```
输入: "  hello world!  "
输出: "world! hello"
```
解释: 输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。

示例 3：
```
输入: "a good   example"
输出: "example good a"
```
解释: 如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。
 

说明：

无空格字符构成一个单词。

输入字符串可以在前面或者后面包含多余的空格，但是反转后的字符不能包括。

如果两个单词间有多余的空格，将反转后单词间的空格减少到只含一个。

`双指针法` 初始化指针i和j，分别指向单词第一个字母前的空格和最后一个字母。从后向前移动i和j。当头尾，中间出现空格时，i和j均向前移动。当i指向字母时，仅移动i。
```python
class Solution:
    def reverseWords(self, s: str) -> str:
        i = j = len(s)-1
        words = []
        while i > -1:
            while i >=0 and s[j] == ' ': 
                j -= 1
                i -= 1
            while i >= 0 and s[i] != ' ': i -= 1
            if j >= 0: words.append(str(s[i+1 : j+1]))
            j = i
        return " ".join(words)  
```
`复杂度` 时间：遍历数组O(N)，空间：拷贝数组O(N)

`易忽略的点` 注意去除头空格时需要判断j>=0,否则words 序列中会出现s[0:0]=None，以上双指针法速度会比较慢，在python中可以直接用split()，(注：s.split(" ")解决不了单词间多空格的问题，s.split()可以解决。。。)