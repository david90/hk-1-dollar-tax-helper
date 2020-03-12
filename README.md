# hk-1-dollar-tax-helper
You only want to pay 1 dollar tax per transaction

## 點解我要寫/點解你或者想用

坊間都有好些自動交稅的程式。可是，因為它們是APP或EXR等不公開code的形式，要用在自己的E-Banking畢竟會有些安全考慮。
然而，又不想自己戇鳩鳩手動撳$1。

因為，這個Project的重點：
**我寫嘅所有嘢你都睇到**<br>
如果你驚我有鬼祟，你有技術力可以自己睇，你自己冇可以搵你有IT JavaScript知識嘅人幫你睇。

## 點用?

### 匯豐
1. 登入E-Banking，在上方「我的銀行」的彈出選單，選擇「轉帳」下面的「繳交稅款」，去到交稅頁面
2. 打開瀏覽器的Console/主控台 *參照下方「如何打開Console/主控台」標題
3. 如果你並非第1次使用，跳至第4步。<br><br>
如果你是第1次使用，將HSBC-eBanking-Template.js內容複製到你電腦的記事本，更改下列項目，然後儲存
    - __FROM_ACCOUNT__ 更改為你的支賬戶口/信用卡號碼
    - __FROM_ACCOUNT_EXTRA__ 如果你的支賬戶口有選擇分項(如"港元往來"、"澳元儲蓄")，則填入此項；否則可略過
    - __TAX_ACCOUNT__ 更改為稅務局給你的稅務編號，並省略所有'-'
4. 在瀏覽器的Console/主控台，複製貼上在你電腦的記事本經修改的HSBC-eBanking-Template.js內容，然後按Enter
5. 想停止代碼運行，只需「重新整理」頁面

### 恆生
1. 登入E-Banking，在左方選單選擇「P.P.支付平台」下面的「帳單及繳費」，再選擇「繳付帳單」，去到交稅頁面
2. 打開瀏覽器的Console/主控台 *參照下方「如何打開Console/主控台」標題
3. 如果你並非第1次使用，跳至第5步。<br><br>
如果你是第1次使用，
    1. 在交稅頁面的支帳戶口，選擇你想要使用的戶口。
    2. 在瀏覽器的Console/主控台輸入下面這句代碼並Enter<br>
```document.querySelector("input[id$=_DebitAcctList-value]").value```<br>
    3. 最後會輸出1-2位的數字字母，你必須將結果記低

4. 將HangSeng-eBanking-Template.js內容複製到你電腦的記事本，更改下列項目，然後儲存
    - __YOUR_TAX_ID__ 更改為稅務局給你的稅務編號，並省略所有'-'
    - __YOUR_DEBITACCT_CODE__ 更改為你在第3步運行代碼的1-2位的數字字母
5. 複製貼上在你電腦的記事本經修改的HangSeng-eBanking-Template.js內容，然後按Enter
6. 想停止代碼運行，只需「重新整理」頁面

## 如何打開Console/主控台
### Chrome
1. 在頁面上按Ctrl+Shift+J

### Firefox
1. 在頁面上按Ctrl+Shift+K

### IE
1. 下載Chrome或Firefox，然後參照上方教學
