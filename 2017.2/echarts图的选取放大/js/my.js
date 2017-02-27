/**
 * Created by Administrator on 2017/2/9 0009.
 */
console.log(Resize)
if (this.Resize) {
    var op = this.options, _resize = new Resize(this._layHandle, { Max: true, onResize: Bind(this, this.SetPos) })};
op.RightDown && (_resize.Set(op.RightDown, "right-down"));
op.LeftDown && (_resize.Set(op.LeftDown, "left-down"));
op.RightUp && (_resize.Set(op.RightUp, "right-up"));
op.LeftUp && (_resize.Set(op.LeftUp, "left-up"));
op.Right && (_resize.Set(op.Right, "right"));
op.Left && (_resize.Set(op.Left, "left"));
op.Down && (_resize.Set(op.Down, "down"));
op.Up && (_resize.Set(op.Up, "up"));