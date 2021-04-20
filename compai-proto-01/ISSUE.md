# Issue with resolution.

## Resolution 
the file [model.py](https://github.com/GuillaumeAI/rwml__adaptive_style_transfer/blob/master/model.py#L460-L461) line 460 is the inference function which has a ResizeToOriginal flag in its parameters.

```py
def inference(self, args, path_to_folder, to_save_dir=None, resize_to_original=True,
                  ckpt_nmbr=None):
```
## Description
>when executing on the container, we can specify the output resultion and with the web service, the resolution is dependent on the input content.
 
* can we make a service that would output a 1k for the first pass and a 2k for the second pass ?