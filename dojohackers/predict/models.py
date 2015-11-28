from django.db import models


class SampleFile(models.Model):
    sample_file = models.FileField(upload_to='sample_files')
